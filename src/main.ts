import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule); // Create new Nestjs application using root module(AppModule).
  app.useGlobalPipes(new ValidationPipe()); // Whenever NestJS encounters any of those validation decorator's, it will execute validation.

  const port = 3000;
  await app.listen(port); // And listen for Nestjs application running.

  // Log after this app listening 3000 port.
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
