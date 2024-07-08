import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SseEventsService {
  constructor(private readonly eventEmitter: EventEmitter2) {
    let i = 0;
    setInterval(() => {
      this.sendSSEInQueue({
        message: `Test message ${i}`,
        type: 'notifications-admin',
      });
      i++;
    }, 10000);
  }

  /**
   * @description Starts a Server-Sent Events (SSE) stream.
   * SSE is a unidirectional communication protocol that allows the server to push updates to the client over a single HTTP connection.
   * In this function, we create an Observable to listen for SSE events.
   * When an SSE event with the 'sse.event' type is received, it will emit the event data to subscribers as an Observable stream.
   * The emitted data will be wrapped in an object with the type 'participants'.
   * @returns {Observable<any>} An Observable that emits SSE event data with the type 'participants'.
   */
  startSSE(): Observable<any> {
    return new Observable((observer) => {
      console.log('Inside SSE function');
      this.eventEmitter.on('sse.event', (data: any) => {
        observer.next({ data: data, type: data?.type || 'bids' });
      });
    });
  }
  async sendSSEInQueue(
    data: any,
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log('Event emitted');
      this.eventEmitter.emitAsync('sse.event', data);
      return { success: true, message: 'Event emitted!' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Event emission failed' };
    }
  }
}
