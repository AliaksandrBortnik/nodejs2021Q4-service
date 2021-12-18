import {TaskService} from './task.service';
import {FastifyReply} from 'fastify';
import { Task } from "./task.model";
import {TaskFastifyRequest} from "./task.request";

/**
 * Class to handle all Task's requests
 */
export class TaskController {
  req: TaskFastifyRequest;
  res: FastifyReply;
  taskService: TaskService;

  /**
   * Constructor of TaskController class
   * @param req - request
   * @param res - response
   */
  constructor(req: TaskFastifyRequest, res: FastifyReply) {
    this.req = req;
    this.res = res;
    this.taskService = new TaskService();
  }

  /**
   * Get all tasks of the board and send tasks as a response with 200 status.
   */
  async getAllByBoardId(): Promise<void> {
    const boardId: string = this.req.params.boardId;
    const tasks: Task[] = await this.taskService.getAllByBoardId(boardId);
    this.res.code(200).send(tasks);
  }

  /**
   * Get a task by ID and send the task as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  async getById(): Promise<void> {
    const taskId: string = this.req.params.taskId;
    const boardId: string = this.req.params.boardId;

    const task: Task | undefined = await this.taskService.getById(boardId, taskId);

    if (!task) {
      this.res.code(404).send({ message: 'Not Found' });
      return;
    }

    this.res.code(200).send(task);
  }

  /**
   * Add a task and send the created task as a response with 201 status.
   */
  async add(): Promise<void> {
    const boardId: string = this.req.params.boardId;
    const task: Task | undefined = await this.taskService.add(boardId, this.req.body);
    this.res.status(201).send(task);
  }

  /**
   * Update a task and send the updated task as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  async update(): Promise<void> {
    const boardId: string = this.req.params.boardId;
    const taskId: string = this.req.params.taskId;

    const taskExists: boolean = !!(await this.taskService.getById(boardId, taskId));

    if (!taskExists) {
      this.res.code(404).send({ message: 'Not Found' });
      return;
    }

    const task: Task = await this.taskService.update(boardId, taskId, this.req.body);
    this.res.code(200).send(task);
  }

  /**
   * Remove a task and send a response with 204 status if found.
   * Otherwise, send 404 response.
   */
  async remove(): Promise<void> {
    const boardId: string = this.req.params.boardId;
    const taskId: string = this.req.params.taskId;

    const taskExists = !!(await this.taskService.getById(boardId, taskId));

    if (!taskExists) {
      this.res.code(404).send({ message: 'Not Found' });
      return;
    }

    await this.taskService.remove(boardId, taskId);
    this.res.code(204);
  }
}