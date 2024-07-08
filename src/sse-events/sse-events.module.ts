import { Module } from '@nestjs/common';
import { SseEventsService } from './sse-events.service';
import { SseEventsController } from './sse-events.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      global: true,
    }),
  ],
  controllers: [SseEventsController],
  providers: [SseEventsService],
  exports:[SseEventsService],
})
export class SseEventsModule {}
