import {FastifyRequest} from "fastify";
import {Task} from "../../entity/task.model";

export type TaskFastifyRequest = FastifyRequest<{
  Params: {
    boardId: string,
    taskId: string
  },
  Body: Task
}>;