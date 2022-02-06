import {Response} from 'express'
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res} from "@nestjs/common";
import {TaskService} from "./task.service";
import {TaskDto} from "./dto/task.dto";
import {CreateTaskDto} from "./dto/create-task.dto";

@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  /**
   * Get all tasks of the board and send tasks as a response with 200 status.
   */
  @Get()
  async getAllByBoardId(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    return this.taskService.getAllByBoardId(boardId);
  }

  /**
   * Get a task by ID and send the task as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  @Get(':taskId')
  async getById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Res() res: Response
  ): Promise<void> {
    const task: TaskDto | undefined = await this.taskService.getById(taskId);

    if (!task) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.OK).send(task);
  }

  /**
   * Add a task and send the created task as a response with 201 status.
   */
  @Post()
  async add(
    @Param('boardId') boardId: string,
    @Body() taskDto: CreateTaskDto,
    @Res() res: Response
  ): Promise<void> {
    if (boardId !== taskDto.boardId && taskDto.boardId !== null) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'Mismatch of boardId' });
      return;
    }

    // Keep boardId overriding from params due to current existing POST test where no boardId in body
    const task = await this.taskService.addOrUpdate({ ...taskDto, boardId });
    res.status(HttpStatus.CREATED).send(task);
  }

  /**
   * Update a task and send the updated task as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  @Put(':taskId')
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() taskDto: TaskDto,
    @Res() res: Response
  ): Promise<void> {
    if (boardId !== taskDto.boardId && taskDto.boardId !== null) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'Mismatch of boardId' });
      return;
    }

    const taskExists = !!(await this.taskService.getById(taskId));

    if (!taskExists) {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    const task = await this.taskService.addOrUpdate(taskDto);
    res.status(HttpStatus.OK).send(task);
  }

  /**
   * Remove a task and send a response with 204 status if found.
   * Otherwise, send 404 response.
   */
  @Delete(':taskId')
  @HttpCode(204)
  async remove(
    @Param('taskId') taskId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    const taskExists = !!(await this.taskService.getById(taskId));

    if (!taskExists) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    await this.taskService.remove(taskId);
  }
}