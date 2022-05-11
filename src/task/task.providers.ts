import {Connection} from "typeorm";
import {TaskRepository} from "./task.repository";
import {TaskService} from "./task.service";

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (connection: Connection): TaskRepository =>
      connection.getCustomRepository(TaskRepository),
    inject: ['DATABASE_CONNECTION']
  },
  TaskService
];
