import {FastifyRequest} from "fastify";
import {User} from "./user.model";

export type UserFastifyRequest = FastifyRequest<{
  Params: {
    id: string
  },
  Body: User
}>;