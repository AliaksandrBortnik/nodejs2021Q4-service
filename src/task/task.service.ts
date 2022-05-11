import {Inject, Injectable} from "@nestjs/common";
import {TaskRepository} from "./task.repository";
import {TaskEntity} from "./entities/task.entity";
import {TaskDto} from "./dto/task.dto";
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskRepo: TaskRepository
  ) {}

  /**
   * Get all tasks of the board
   * @param boardId - Board id
   * @returns Returns promise of all existing tasks of the board
   */
  async getAllByBoardId(boardId: string): Promise<TaskDto[]> {
    const tasks = await this.taskRepo.getAllByBoardId(boardId);
    return tasks.map(this.mapEntityToDto);
  }

  /**
   * Get task by id
   * @param id - Task's id
   * @returns Returns promise of a task if found or undefined
   */
  async getById(id: string): Promise<TaskDto | undefined> {
    const entity = await this.taskRepo.findOne(id);
    return entity && this.mapEntityToDto(entity);
  }

  /**
   * Add or update a task
   * @param task - Task payload
   * @returns Returns promise of a new task
   */
  async addOrUpdate(task: CreateTaskDto | TaskDto): Promise<TaskDto> {
    const entity = await this.taskRepo.save(task);
    return this.mapEntityToDto(entity);
  }

  /**
   * Removes the task by id
   * @param id - Task's id
   */
  async remove(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }

  mapEntityToDto(entity: TaskEntity): TaskDto {
    return {
      id: entity.id,
      title: entity.title,
      order: entity.order,
      description: entity.description,
      userId: entity.userId,
      boardId: entity.boardId,
      columnId: entity.columnId
    };
  }
}