import {getCustomRepository} from "typeorm";
import {UserRepository} from "../users/user.repository";

/**
 * Auth's business logic and work with Data Access Layer
 */
export class AuthService {
  userRepo: UserRepository;

  constructor() {
    this.userRepo = getCustomRepository(UserRepository);
  }

  async checkUser(login: string, password: string): Promise<string | null> {
    return this.userRepo.authenticate(login, password);
  }
}