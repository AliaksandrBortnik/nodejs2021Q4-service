import { User } from "../../entity/user.model";
import {EntityRepository, Repository} from "typeorm";

/**
 * User's repository to work with DB
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> { }