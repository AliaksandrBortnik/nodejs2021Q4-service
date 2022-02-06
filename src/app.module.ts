import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {BoardModule} from "./board/board.module";
import {TaskModule} from "./task/task.module";
import {DatabaseModule} from "./database/database.module";
import {AuthModule} from "./auth/auth.module";
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import {AllExceptionsFilter} from "./all-exception.filter";
import {LoggerModule} from "nestjs-pino";
import {config} from "./common/config";
import {pino} from "pino";
import LevelWithSilent = pino.LevelWithSilent;
import {FastifyReply, FastifyRequest} from "fastify";
import {RequestBodyInterceptor} from "./request-body.interceptor";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        serializers: {
          req(request: FastifyRequest) {
            return {
              method: request.method,
              url: request.url,
              query: request.query,
              parameters: request.params
              // Request's body is logged through interceptor
            };
          },
          res(reply: FastifyReply) {
            return {
              statusCode: reply.statusCode
            };
          },
        },
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: config.NODE_ENV === 'development' ? config.LOG_LEVEL as LevelWithSilent : 'silent',
              options: { colorize: true }
            },
            {
              target: 'pino/file',
              level: 'error',
              options: { destination: './logs/error.txt', mkdir: true },
            },
            {
              target: 'pino/file',
              level: config.LOG_LEVEL as LevelWithSilent,
              options: { destination: './logs/all.txt', mkdir: true },
            }
          ],
        },
      }
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    BoardModule,
    TaskModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestBodyInterceptor},
    { provide: APP_FILTER, useClass: AllExceptionsFilter }
  ],
})
export class AppModule {}
