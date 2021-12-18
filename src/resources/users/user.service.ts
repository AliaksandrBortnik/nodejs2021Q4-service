import { User } from "./user.model";
import { UserRepository } from './user.repository';
import { TaskRepository } from '../tasks/task.repository';
import { Task } from "../tasks/task.model";

/**
 * User's business logic and work with Data Access Layer
 */
export class UserService {
  userRepo: UserRepository;
  taskRepo: TaskRepository;

  /**
   * Constructor of UserService class
   */
  constructor() {
    this.userRepo = new UserRepository();
    this.taskRepo = new TaskRepository();
  }

  /**
   * Get all users
   * @returns Returns promise of all existing users
   */
  async getAll(): Promise<User[]> {
    return await this.userRepo.getAll();
  }

  /**
   * Get user by id
   * @param id - User's id
   * @returns Returns promise of a user if found
   */
  async getById(id: string): Promise<User | undefined> {
    return await this.userRepo.getById(id);
  }

  /**
   * Add a new user
   * @param user - User payload
   * @returns Returns promise of a new user
   */
  async add(user: User): Promise<User> {
    return this.userRepo.add(user);
  }

  /**
   * Update the user
   * @param id - User's id
   * @param user - User's payload
   * @returns Returns promise of updated user
   */
  async update(id: string, user: User) {
    return this.userRepo.update(id, user);
  }

  /**
   * Removes the user by id
   * @param id - User's id
   */
  async remove(id: string): Promise<void> {
    const tasks: Task[] = await this.taskRepo.getAll();
    const userTasks: Task[] = tasks.filter(t => t.userId === id);

    const tasksUpdateBatch: Promise<Task>[] = [];

    for (let i = 0; i < userTasks.length; i += 1) {
      userTasks[i].userId = null;
      tasksUpdateBatch.push(this.taskRepo.update(userTasks[i].id, userTasks[i]));
    }

    if (tasksUpdateBatch.length) {
      await Promise.all(tasksUpdateBatch);
    }

    await this.userRepo.remove(id);
  }
}