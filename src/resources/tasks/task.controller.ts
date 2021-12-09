import TaskService from './task.service';
import {FastifyReply, FastifyRequest} from 'fastify';
import Task from "resources/tasks/task.model";

type CustomFastifyRequest = FastifyRequest<{
  Params: {
    boardId: string,
    taskId: string
  },
  Body: Task
}>;

async function getAll(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const tasks: Task[] = await TaskService.getAll(req.params.boardId);
  res.code(200).send(tasks);
}

async function getById(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const task = await TaskService.getById(req.params.boardId, req.params.taskId);

  if (!task) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  res.code(200).send(task);
}

async function add(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const task = await TaskService.add(req.params.boardId, req.body);
  res.status(201).send(task);
}

async function update(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const taskExists = !!(await TaskService.getById(req.params.boardId, req.params.taskId));

  if (!taskExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  const task = await TaskService.update(req.params.boardId, req.params.taskId, req.body);
  res.code(200).send(task);
}

async function remove(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const taskExists = !!(await TaskService.getById(req.params.boardId, req.params.taskId));

  if (!taskExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  await TaskService.remove(req.params.boardId, req.params.taskId);
  res.code(204);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};