import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: true, // Allow any origin
    credentials: true, // This option is required if your frontend application needs to send credentials (like cookies or authentication headers)
  });
  await app.listen(4001);
}
bootstrap();
