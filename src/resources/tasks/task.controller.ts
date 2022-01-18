import {TaskService} from './task.service';
import {FastifyReply} from 'fastify';
import { Task } from "../../entity/task.model";
import {TaskFastifyRequest} from "./task.request";
import {StatusCodes} from "http-status-codes";

/**
 * Class to handle all Task's requests
 */
export class TaskController {
  req: TaskFastifyRequest;
  res: FastifyReply;
  taskService: TaskService;

  /**
   * Constructor of TaskController class
   * @param req - request object
   * @param res - response object
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
    this.res.code(StatusCodes.OK).send(tasks);
  }

  /**
   * Get a task by ID and send the task as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  async getById(): Promise<void> {
    const taskId: string = this.req.params.taskId;
    const task: Task | undefined = await this.taskService.getById(taskId);

    if (!task) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    this.res.code(StatusCodes.OK).send(task);
  }

  /**
   * Add a task and send the created task as a response with 201 status.
   */
  async add(): Promise<void> {
    const boardId: string = this.req.params.boardId;

    if (boardId !== this.req.body.boardId && this.req.body.boardId !== null) {
      this.res.code(StatusCodes.BAD_REQUEST).send({ message: 'Mismatch of boardId' });
      return;
    }

    // TODO: make sure boardId is added from params
    const task: Task | undefined = await this.taskService.addOrUpdate({ ...this.req.body, boardId });
    this.res.status(StatusCodes.CREATED).send(task);
  }

  /**
   * Update a task and send the updated task as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  async update(): Promise<void> {
    const boardId: string = this.req.params.boardId;
    const taskId: string = this.req.params.taskId;

    if (boardId !== this.req.body.boardId && this.req.body.boardId !== null) {
      this.res.code(StatusCodes.BAD_REQUEST).send({ message: 'Mismatch of boardId' });
      return;
    }

    const taskExists = !!(await this.taskService.getById(taskId));

    if (!taskExists) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    const task = await this.taskService.addOrUpdate(this.req.body);
    this.res.code(StatusCodes.OK).send(task);
  }

  /**
   * Remove a task and send a response with 204 status if found.
   * Otherwise, send 404 response.
   */
  async remove(): Promise<void> {
    const taskId: string = this.req.params.taskId;

    const taskExists = !!(await this.taskService.getById(taskId));

    if (!taskExists) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    await this.taskService.remove(taskId);
    this.res.code(StatusCodes.NO_CONTENT);
  }
}