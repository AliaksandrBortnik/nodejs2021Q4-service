import {LoggerOptions, Logger, TransportMultiOptions, pino} from 'pino';
import {FastifyReply, FastifyRequest} from "fastify";
import config from "./common/config";

const transport = <TransportMultiOptions>{
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
};

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

const options: LoggerOptions = {
  transport,
  serializers,
  level: config.LOG_LEVEL, // Override default logger info level to support any level in transport
};

export const logger: Logger = pino(options);