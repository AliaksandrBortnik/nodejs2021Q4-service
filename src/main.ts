import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "./common/config";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {logger} from "./logger";
import "reflect-metadata";
import {ValidationPipe} from "@nestjs/common";
// import {Logger} from "nestjs-pino";

const PORT: string = config.PORT || '4000';

async function bootstrap() {
  const appOptions = {
    bufferLogs: true
  };

  // https://docs.nestjs.com/techniques/performance
  const app = config.USE_FASTIFY ?
    await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), appOptions) :
    await NestFactory.create(AppModule, appOptions);

  // Auto-validation according to DTO validation decorators
  app.useGlobalPipes(new ValidationPipe());

  // app.useLogger(app.get(Logger));
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useLogger(app.get(CustomLogger));

  await app.listen(PORT, '0.0.0.0'); // TODO: review. is it fine for express 0.0.0.0?
  // TODO: log errors on listen
  // app.listen(PORT, '0.0.0.0').catch((error: unknown) => {
  //   if (error instanceof Error) {
  //     app.log.fatal(error.message);
  //     process.exit(1);
  //   }
  // });
}
bootstrap();
