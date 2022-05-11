import {Connection} from "typeorm";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection): UserRepository =>
      connection.getCustomRepository(UserRepository),
    inject: ['DATABASE_CONNECTION']
  },
  UserService
];
