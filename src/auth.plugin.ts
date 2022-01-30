import {StatusCodes} from "http-status-codes";
import {FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify";
import fp from "fastify-plugin";
import {fastifyJwt} from "fastify-jwt";
import {config} from "./common/config";

export const authValidator: FastifyPluginAsync =
  fp(async function(app: FastifyInstance) {
    app.register(fastifyJwt, {
      secret: config.JWT_SECRET_KEY!
    });

    app.addHook('preValidation', async (request: FastifyRequest, reply: FastifyReply) => {
      if (!['/login', '/'].includes(request.url) && !request.url.startsWith('/doc')) {
        if (request.headers['authorization']) {
          try {
            await request.jwtVerify()
          } catch (err) {
            reply.status(StatusCodes.UNAUTHORIZED).send();
          }
        } else {
          reply.status(StatusCodes.UNAUTHORIZED).send();
        }
      }
    });
  });