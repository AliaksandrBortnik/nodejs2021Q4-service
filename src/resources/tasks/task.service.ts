import { TaskRepository } from "./task.repository";
import { Task } from "./task.model";

/**
 * Task's business logic and work with Data Access Layer
 */
export class TaskService {
  taskRepo: TaskRepository;

  /**
   * Constructor of TaskService class
   */
  constructor() {
    this.taskRepo = new TaskRepository();
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
   * @param boardId - Board's id
   * @param id - Task's id
   * @returns Returns promise of a task if found
   */
  async getById(boardId: string, id: string): Promise<Task | undefined> {
    return this.taskRepo.getById(id);
  }

  /**
   * Add a new task
   * @param boardId - Board's id
   * @param task - Task payload
   * @returns Returns promise of a new task
   */
  async add(boardId: string, task: Task): Promise<Task> {
    return this.taskRepo.add(boardId, task);
  }

  /**
   * Update the task
   * @param boardId - Board's id
   * @param taskId - Task id
   * @param task - Task's payload
   * @returns Returns promise of updated task
   */
  async update(boardId: string, taskId: string, task: Task): Promise<Task> {
    return this.taskRepo.update(taskId, task);
  }

  /**
   * Removes the task by id
   * @param boardId - Board's id
   * @param id - Task's id
   */
  async remove(boardId: string, id: string): Promise<void> {
    return this.taskRepo.remove(id);
  }
}
