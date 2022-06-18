import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create new Nestjs application using root module(AppModule).
  app.useGlobalPipes(new ValidationPipe()); // Whenever NestJS encounters any of those validation decorator's, it will execute validation.

  await app.listen(3000); // And listen for Nestjs application running.
}
bootstrap();
