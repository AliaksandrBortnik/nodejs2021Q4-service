import {FastifyRequest} from "fastify";
import {Board} from "../../entity/board.model";

export type BoardFastifyRequest = FastifyRequest<{
  Params: {
    id: string
  },
  Body: Board
}>;