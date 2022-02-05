import {Inject, Injectable} from "@nestjs/common";
import {TaskRepository} from "./task.repository";
import {TaskEntity} from "./entities/task.entity";

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
  async getAllByBoardId(boardId: string): Promise<TaskEntity[]> {
    return this.taskRepo.getAllByBoardId(boardId);
  }

  /**
   * Get task by id
   * @param id - Task's id
   * @returns Returns promise of a task if found or undefined
   */
  async getById(id: string): Promise<TaskEntity | undefined> {
    return this.taskRepo.findOne(id);
  }

  /**
   * Add or update a task
   * @param task - Task payload
   * @returns Returns promise of a new task
   */
  async addOrUpdate(task: TaskEntity): Promise<TaskEntity> {
    return this.taskRepo.save(task);
  }

  /**
   * Removes the task by id
   * @param id - Task's id
   */
  async remove(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }
}