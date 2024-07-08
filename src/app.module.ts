import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SseEventsModule } from './sse-events/sse-events.module';

@Module({
  imports: [SseEventsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
