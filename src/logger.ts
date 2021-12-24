import {Logger, TransportMultiOptions, pino} from 'pino';
import {FastifyReply, FastifyRequest} from "fastify";
import config from "./common/config";

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
      // request.body is parsed and logged via a fastify hook separately
    };
  },
  res(reply: FastifyReply) {
    return {
      statusCode: reply.statusCode
    };
  },
};

export const logger: Logger = pino({ level: config.LOG_LEVEL, serializers }, options);