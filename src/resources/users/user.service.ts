import { User } from "../../entity/user.model";
import { UserRepository } from './user.repository';
import { TaskService } from '../tasks/task.service';
import {getCustomRepository, InsertResult, UpdateResult} from "typeorm";

/**
 * User's business logic and work with Data Access Layer
 */
export class UserService {
  userRepo: UserRepository;
  taskService: TaskService;

  /**
   * Constructor of UserService class
   */
  constructor() {
    this.userRepo = getCustomRepository(UserRepository);
    this.taskService = new TaskService();
  }

  /**
   * Get all users
   * @returns Returns promise of all existing users
   */
  async getAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  /**
   * Get user by id
   * @param id - User's id
   * @returns Returns promise of a user if found or undefined
   */
  async getById(id: string): Promise<User | undefined> {
    return await this.userRepo.findOne(id);
  }

  /**
   * Add a new user
   * @param user - User payload
   * @returns Returns promise of a new user
   */
  async add(user: User): Promise<User> {
    const inserted: InsertResult = await this.userRepo.insert(user);
    return this.userRepo.findOneOrFail(inserted.identifiers[0]);
    // return this.userRepo.save(user);
  }

  /**
   * Update the user
   * @param id - User's id
   * @param user - User's payload
   * @returns Returns promise of updated user
   */
  async update(id: string, user: User): Promise<User> {
    await this.userRepo.update(id, user);
    return Promise.resolve(user);
    // return this.userRepo.save(user);
  }

  /**
   * Removes the user by id
   * @param id - User's id
   */
  async remove(id: string): Promise<void> {
    // await this.taskService.unassignUser(id);
    await this.userRepo.delete(id);
  }
}