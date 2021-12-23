import app from './app';
import config from './common/config';
import {FastifyError} from "fastify";

const PORT: string = config.PORT || '4000';

app.listen(PORT).catch((error: unknown) => {
  if (error instanceof Error) {
    app.log.fatal(error.message);
  }
});

app.setErrorHandler((error: FastifyError, request, reply) => {
  app.log.error(error.message);
  reply.status(500).send(error.message);
});

process.on('uncaughtException', (error: Error) => {
  app.log.fatal(error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error: Error) => {
  app.log.fatal(error.message);
  process.exit(1);
});

// TODO: remove
//throw new Error('Ooops');
// Promise.reject(new Error('Ops, rejected'));