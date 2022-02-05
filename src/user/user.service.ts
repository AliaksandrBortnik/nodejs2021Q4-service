import {Inject, Injectable} from '@nestjs/common';
import bcryptjs from "bcryptjs";
import {UserRepository} from "./user.repository";
import {UserEntity} from "./entities/user.entity";
import {config} from "../common/config";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository
  ) {}

  /**
   * Get all users
   * @returns Returns promise of all existing users
   */
  async getAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  /**
   * Get user by id
   * @param id - User's id
   * @returns Returns promise of a user if found or undefined
   */
  async getById(id: string): Promise<UserEntity | undefined> {
    return this.userRepo.findOne(id);
  }

  /**
   * Add or update a user
   * @param user - User payload
   * @returns Returns promise of a new user
   */
  async addOrUpdate(user: UserEntity): Promise<UserEntity> {
    user.password = bcryptjs.hashSync(user.password, Number(config.AUTH_SALT_ROUNDS));
    return this.userRepo.save(user);
  }

  /**
   * Removes the user by id
   * @param id - User's id
   */
  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }

  async findByCredentials(login: string, password: string): Promise<string | null> {
    const user = await this.userRepo.findOneByLogin(login);

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return null;
    }

    return user.id;
  }
}
