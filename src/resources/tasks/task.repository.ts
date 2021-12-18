import {v4 as uuidv4} from "uuid";
import {store} from '../../store';
import { Task } from "./task.model";

/**
 * Task's repository to work with DB
 */
export class TaskRepository {
  /**
   * Get all tasks by userId from DB
   * @param userId - User's id
   * @returns Returns promise of all existing tasks of the user
   */
  async getAllByUserId(userId: string): Promise<Task[]> {
    return store.tasks.filter(t => t.userId === userId);
  }

  /**
   * Get all tasks by boardId from DB
   * @param boardId - Board's id
   * @returns Returns promise of all existing tasks of the board
   */
  async getAllByBoardId(boardId: string) {
    return store.tasks.filter(t => t.boardId === boardId);
  }

  /**
   * Get task by id from DB
   * @param id - Task's id
   * @returns Returns promise of a task if found
   */
  async getById(id: string) {
    return store.tasks.find(u => u.id === id);
  }

  /**
   * Add a new task to DB
   * @param boardId - Board id
   * @param task - Task payload
   * @returns Returns promise of a new task
   */
  async add(boardId: string, task: Task): Promise<Task> {
    const entity: Task = { ...task, id: uuidv4(), boardId };
    store.tasks.push(entity);
    return entity;
  }

  /**
   * Update the task in DB
   * @param id - Task's id
   * @param task - Task's payload
   * @returns Returns promise of updated task
   */
  async update(id: string, task: Task): Promise<Task> {
    const index = store.tasks.findIndex(u => u.id === id);
    store.tasks[index] = { ...task, id };
    return store.tasks[index];
  }

  /**
   * Removes the task by id from DB
   * @param id - Task's id
   */
  async remove(id: string): Promise<void> {
    store.tasks = store.tasks.filter(u => u.id !== id);
  }
}