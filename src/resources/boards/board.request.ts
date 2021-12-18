import {FastifyRequest} from "fastify";
import {Board} from "./board.model";

export type BoardFastifyRequest = FastifyRequest<{
  Params: {
    id: string
  },
  Body: Board
}>;