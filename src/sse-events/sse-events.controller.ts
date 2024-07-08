import { Controller, Get, Res } from '@nestjs/common';
import { SseEventsService } from './sse-events.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('sse-events')
export class SseEventsController {
  constructor(private readonly sseEventsService: SseEventsService) {}

  /**
   *
   * @description Get API for testing SSE
   * @param
   * @returns Returns index.html
   *
   */
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }
  // /**
  //  *
  //  * @description Server sent events for events needed in dashbaord. (Server to client)
  //  * @param
  //  * @returns Returns data from server
  //  *
  //  */

  @Get('stream')
  sendEvents(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    this.sseEventsService.startSSE().subscribe((event) => {
      const formattedEvent = `event: ${event.type}\ndata: ${JSON.stringify(
        event.data,
      )}\n\n`;
      res.write(formattedEvent);
    });

    res.on('close', () => {
      console.log('Client connection closed');
      res.end();
    });
  }
}

//TODO Remove when we have SSE events finlaized properly

//   @Get()
//   @Sse('event')
//   sse(): Observable<MessageEvent> {
//     return new Observable((observer) => {
//       // Send the initial data to the client
//       observer.next({
//         data: 'useful data',
//         type: 'notice',
//         id: 'someid',
//         retry: 3,
//       });

//       // Set up a periodic interval to send updates
//       const intervalId = setInterval(() => {
//         observer.next({
//           data: 'Updated data',
//           type: 'notice',
//           id: 'update',
//           retry: 3,
//         });
//       }, 5000);

//       // Clean up the interval when the client disconnects
//       return () => {
//         clearInterval(intervalId);
//       };
//     });
//   }
// }

//
// import { Controller, Get, MessageEvent, Res, Sse } from '@nestjs/common';
// import { Response } from 'express';
// import { readFileSync } from 'fs';
// import { join } from 'path';
// import { interval, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Controller()
// export class AppController {
//   @Get()
//   index(@Res() response: Response) {
//     response
//       .type('text/html')
//       .send(readFileSync(join(__dirname, 'index.html')).toString());
//   }

//   // @Sse('sse')
//   // sse(): Observable<MessageEvent> {
//   //   return interval(1000).pipe(
//   //     map((_) => ({ data: { hello: 'world' } }) as MessageEvent),
//   //   );
//   // }
//   // @Sse('sse')
//   // sse(): Observable<MessageEvent> {
//   //   return new Observable((observer) => {
//   //     // Send the initial data to the client
//   //     observer.next({
//   //       data: 'useful data',
//   //       type: 'notice',
//   //       id: 'someid',
//   //       retry: 3,
//   //     });

//   //     // Set up a periodic interval to send updates
//   //     const intervalId = setInterval(() => {
//   //       observer.next({
//   //         data: 'Updated data',
//   //         type: 'notice',
//   //         id: 'update',
//   //         retry: 3,
//   //       });
//   //     }, 1000);

//   //     // Clean up the interval when the client disconnects
//   //     return () => {
//   //       clearInterval(intervalId);
//   //     };
//   //   });
//   // }
//   @Sse('sse')
//   sseParticipants(): Observable<MessageEvent> {
//     const data = {
//       message: [
//         {
//           email: 'mohan@rapidinnovation.dev',
//           is_client: true,
//           name: 'Mohan Chaudhari',
//           profile_logo:
//             'https://lh3.googleusercontent.com/a/ACg8ocLlpoHSaXyMHXV-NG3_ej8FevtgRnLjo9v9Ys-GVGbb3w=s96-c',
//         },
//         {
//           email: 'sourav@rapidinnovation.dev',
//           is_client: true,
//           name: 'Sourav Suman',
//           profile_logo:
//             'https://lh3.googleusercontent.com/a/ACg8ocK0iTOaIEBs8uJQkFeDSyHa3npeG715HFuAY1PlFbm-=s96-c',
//         },
//         {
//           email: '',
//           is_client: false,
//           name: 'ss',
//           profile_logo: '',
//         },
//       ],
//     };
//     return interval(1000).pipe(
//       map(() => {
//         return {
//           type: 'partcipants',
//           data,
//         };
//       }),
//     );
//   }
// }
