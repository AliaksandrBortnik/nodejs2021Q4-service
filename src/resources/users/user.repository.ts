import { User } from "../../entity/user.model";
import {EntityRepository, Repository} from "typeorm";
import bcryptjs from "bcryptjs";

/**
 * User's repository to work with DB
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async authenticate(login: string, password: string): Promise<string | null> {
    const user = await this.findOne({ where: { login }});

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return null;
    }

    return user.id;
  }
}