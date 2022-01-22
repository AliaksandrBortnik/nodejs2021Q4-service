import { User } from "../../entity/user.model";
import { UserRepository } from './user.repository';
import { TaskService } from '../tasks/task.service';
import {getCustomRepository} from "typeorm";
import bcryptjs from 'bcryptjs';
import {config} from "../../common/config";

/**
 * User's business logic and work with Data Access Layer
 */
export class UserService {
  userRepo: UserRepository;
  taskService: TaskService;

  constructor() {
    this.userRepo = getCustomRepository(UserRepository);
    this.taskService = new TaskService();
  }

  /**
   * Get all users
   * @returns Returns promise of all existing users
   */
  async getAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  /**
   * Get user by id
   * @param id - User's id
   * @returns Returns promise of a user if found or undefined
   */
  async getById(id: string): Promise<User | undefined> {
    return this.userRepo.findOne(id);
  }

  /**
   * Add or update a user
   * @param user - User payload
   * @returns Returns promise of a new user
   */
  async addOrUpdate(user: User): Promise<User> {
    user.password = bcryptjs.hashSync(user.password, config.AUTH_SALT_ROUNDS);
    return this.userRepo.save(user);
  }

  /**
   * Removes the user by id
   * @param id - User's id
   */
  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}