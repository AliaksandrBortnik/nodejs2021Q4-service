import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProviders } from "./task.providers";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  exports: [TaskService],
  controllers: [TaskController],
  providers: [...taskProviders]
})
export class TaskModule {}
