import {Injectable} from "@nestjs/common";
import {UserEntity} from "./entities/user.entity";
import {EntityRepository, Repository} from "typeorm";

/**
 * User's repository to work with DB
 */
@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findOneByLogin(login: string): Promise<UserEntity | undefined> {
    return this.findOne({ where: { login }});
  }
}