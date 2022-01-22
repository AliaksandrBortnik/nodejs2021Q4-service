import { User } from "../../entity/user.model";
import {EntityRepository, Repository} from "typeorm";

/**
 * User's repository to work with DB
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async isValidUser(login: string, password: string): Promise<string | undefined> {
    const passwordHash = password; // TODO: calculate hash based on password
    const user = await this.findOne({ where: { login, password: passwordHash }, select: ['id']});
    return user?.id;
  }
}