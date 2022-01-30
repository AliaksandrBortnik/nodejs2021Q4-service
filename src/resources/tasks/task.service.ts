import { TaskRepository } from "./task.repository";
import { Task } from "../../entity/task.model";
import {getCustomRepository} from "typeorm";

/**
 * Task's business logic and work with Data Access Layer
 */
export class TaskService {
  taskRepo: TaskRepository;

  constructor() {
    this.taskRepo = getCustomRepository(TaskRepository);
  }

  /**
   * Get all tasks of the board
   * @param boardId - Board id
   * @returns Returns promise of all existing tasks of the board
   */
  async getAllByBoardId(boardId: string): Promise<Task[]> {
    return this.taskRepo.getAllByBoardId(boardId);
  }

  /**
   * Get task by id
   * @param id - Task's id
   * @returns Returns promise of a task if found or undefined
   */
  async getById(id: string): Promise<Task | undefined> {
    return this.taskRepo.findOne(id);
  }

  /**
   * Add or update a task
   * @param task - Task payload
   * @returns Returns promise of a new task
   */
  async addOrUpdate(task: Task): Promise<Task> {
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
