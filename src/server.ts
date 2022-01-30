import app from './app';
import {config} from './common/config';
import {FastifyError, FastifyReply, FastifyRequest} from "fastify";
import {StatusCodes} from "http-status-codes";
import {createConnection} from "typeorm";

const PORT: string = config.PORT || '4000';

async function init() {
  await createConnection();
}

init().then(() => {
  app.listen(PORT, '0.0.0.0').catch((error: unknown) => {
    if (error instanceof Error) {
      app.log.fatal(error.message);
      process.exit(1);
    }
  });
});

app.setErrorHandler(async (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (error.validation && error.validation.length) {
    app.log.info(error.message);
    reply.status(StatusCodes.BAD_REQUEST).send(error.message);
    return;
  }

  app.log.error('setErrorHandler' + error.message);
  reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
});

/*
 * The body cannot be serialized inside a req method because the request is serialized when Fastify creates the child logger.
 * At that time, the body is not yet parsed. Hence, need to use hook.
 */
app.addHook('preHandler', async (req: FastifyRequest) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed request body')
  }
})

process.on('uncaughtException', (error: Error) => {
  app.log.fatal('uncaughtException' + error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error: Error) => {
  app.log.fatal('unhandledRejection' + error.message);
  process.exit(1);
});