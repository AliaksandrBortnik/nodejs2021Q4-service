import app from './app';
import config from './common/config';
import {FastifyError} from "fastify";
import {StatusCodes} from "http-status-codes";

const PORT: string = config.PORT || '4000';

app.listen(PORT).catch((error: unknown) => {
  if (error instanceof Error) {
    app.log.fatal(error.message);
    process.exit(1);
  }
});

app.setErrorHandler(async (error: FastifyError, request, reply) => {
  if (error.validation && error.validation.length) {
    app.log.info(error.message);
    reply.status(StatusCodes.BAD_REQUEST).send(error.message);
    return;
  }

  app.log.error(error.message);
  reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
});

/*
 * The body cannot be serialized inside a req method because the request is serialized when Fastify creates the child logger.
 * At that time, the body is not yet parsed. Hence, need to use hook.
 */
app.addHook('preHandler', async (req) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'Parsed body')
  }
})

process.on('uncaughtException', (error: Error) => {
  app.log.fatal(error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error: Error) => {
  app.log.fatal(error.message);
  process.exit(1);
});