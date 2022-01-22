import {FastifyRequest} from "fastify";

export type AuthFastifyRequest = FastifyRequest<{
  Body: {
    login: string,
    password: string
  }
}>;