import { TaskRepository } from "./task.repository";
import { Task } from "../../entity/task.model";
import {getCustomRepository, InsertResult} from "typeorm";

/**
 * Task's business logic and work with Data Access Layer
 */
export class TaskService {
  taskRepo: TaskRepository;

  /**
   * Constructor of TaskService class
   */
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
    return this.taskRepo.findOne(id, {relations: ["user", "board", "column"]});
  }

  /**
   * Add a new task
   * @param task - Task payload
   * @returns Returns promise of a new task
   */
  async add(task: Task): Promise<Task> {
    return await this.taskRepo.save(task);
  }

  /**
   * Update the task
   * @param taskId - Task id
   * @param task - Task's payload
   * @returns Returns promise of updated task
   */
  async update(taskId: string, task: Task): Promise<Task> {
    // await this.taskRepo.update(taskId, task);
    return await this.taskRepo.save(task); // TODO: review
  }

  /**
   * Removes the task by id
   * @param id - Task's id
   */
  async remove(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }

  /**
   * Unassign user from all his tasks
   * @param userId - User's id
   */
  async unassignUser(userId: string): Promise<void> {
    const userTasks: Task[] = await this.taskRepo.getAllByUserId(userId);

    // for (let i = 0; i < userTasks.length; i += 1) {
    //   const userTaskId: string = userTasks[i].id;
    //   const updatedTask: Task = { ...userTasks[i], user: undefined };
    //   await this.taskRepo.update(userTaskId, updatedTask);
    // }
  }

  /**
   * Remove all tasks currently existing on the board
   * @param boardId - Board id from which tasks should be dropped
   */
  async eraseAllTasksOfBoard(boardId: string): Promise<void> {
    const boardTasks: Task[] = await this.taskRepo.getAllByBoardId(boardId);
    const tasksId: string[] = boardTasks.map(task => task.id);
    await this.taskRepo.delete(tasksId);
  }
}
