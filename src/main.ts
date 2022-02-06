import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "./common/config";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import "reflect-metadata";
import {ValidationPipe} from "@nestjs/common";
import {Logger} from "nestjs-pino";

const PORT: string = config.PORT || '4000';

async function bootstrap() {
  const appOptions = { bufferLogs: true };

  // https://docs.nestjs.com/techniques/performance
  const app = config.USE_FASTIFY ?
    await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), appOptions) :
    await NestFactory.create(AppModule, appOptions);

  // Override default logger with nestjs-pino logger
  app.useLogger(app.get(Logger));

  // Auto-validation according to DTO validation decorators
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, '0.0.0.0');
}

bootstrap();
