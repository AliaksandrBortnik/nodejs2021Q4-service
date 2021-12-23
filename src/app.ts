import * as path from 'path';
import fastifySwagger from 'fastify-swagger';
import config from "./common/config";
import {
  fastify,
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest
} from 'fastify';
import {userRouter} from './resources/users/user.router';
import {boardRouter} from './resources/boards/board.router';
import {taskRouter} from './resources/tasks/task.router';

import { TransportMultiOptions, Logger, pino } from 'pino';

const options = pino.transport(<TransportMultiOptions>{
  targets: [
    {
      target: 'pino-pretty',
      level: config.NODE_ENV === 'development' ? config.LOG_LEVEL : 'silent',
      options: { colorize: true }
    },
    {
      target: 'pino/file',
      level: 'error',
      options: { destination: './logs/error.txt', mkdir: true },
    },
    {
      target: 'pino/file',
      level: config.LOG_LEVEL,
      options: { destination: './logs/all.txt', mkdir: true }
    }
  ]
});

const serializers = {
  req(request: FastifyRequest) {
    return {
      method: request.method,
      url: request.url,
      query: request.query,
      parameters: request.params,
      body: request.body // TODO: Fix it. It doesn't work
    };
  },
  res(reply: FastifyReply) {
    return {
      statusCode: reply.statusCode
    };
  },
};

const logger: Logger = pino({ level: config.LOG_LEVEL, serializers }, options);
const app: FastifyInstance = fastify({ logger });

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

app.register(fastifySwagger as FastifyPluginCallback, <FastifyRegisterOptions<FastifyPluginOptions>>{
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: { title: 'REST API' }
  },
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml')
  }
});

export default app;
