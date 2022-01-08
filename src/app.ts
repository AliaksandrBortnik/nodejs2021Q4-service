import * as path from 'path';
import fastifySwagger from 'fastify-swagger';
import {
  fastify,
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
  FastifyRegisterOptions
} from 'fastify';
import {userRouter} from './resources/users/user.router';
import {boardRouter} from './resources/boards/board.router';
import {taskRouter} from './resources/tasks/task.router';
import {logger} from "./logger";

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
