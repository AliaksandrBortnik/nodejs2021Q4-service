import {FastifyRequest} from "fastify";
import {Task} from "./task.model";

export type TaskFastifyRequest = FastifyRequest<{
  Params: {
    boardId: string,
    taskId: string
  },
  Body: Task
}>;