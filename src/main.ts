import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { EnvConfig } from './constants/env-config';
import { GenericExceptionFilter } from './filters/generic.exception.filter';
import { HttpExceptionFilter } from './filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log'],
  });
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.useGlobalFilters(new GenericExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(EnvConfig.SERVER_PORT);
}
bootstrap();
