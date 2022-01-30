import {FastifyRequest} from "fastify";
import {User} from "../../entity/user.model";

export type UserFastifyRequest = FastifyRequest<{
  Params: {
    id: string
  },
  Body: User
}>;