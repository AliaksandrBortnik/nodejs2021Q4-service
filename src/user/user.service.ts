import {Inject, Injectable} from '@nestjs/common';
import bcryptjs from "bcryptjs";
import {UserRepository} from "./user.repository";
import {UserEntity} from "./entities/user.entity";
import {config} from "../common/config";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UserDto} from "./dto/user.dto";

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
  async getAll(): Promise<UserDto[]> {
    const users = await this.userRepo.find();
    return users.map(this.mapEntityToDto);
  }

  /**
   * Get user by id
   * @param id - User's id
   * @returns Returns promise of a user if found or undefined
   */
  async getById(id: string): Promise<UserDto | undefined> {
    const entity = await this.userRepo.findOne(id);
    return entity && this.mapEntityToDto(entity);
  }

  /**
   * Add or update a user
   * @param user - User payload
   * @returns Returns promise of a new user
   */
  async addOrUpdate(user: CreateUserDto | UpdateUserDto): Promise<UserDto> {
    user.password = bcryptjs.hashSync(user.password, Number(config.AUTH_SALT_ROUNDS));
    const updated = await this.userRepo.save(user)
    return this.mapEntityToDto(updated);
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

  mapEntityToDto(entity: UserEntity): UserDto {
    return new UserDto(entity.id, entity.name, entity.login);
  }
}
