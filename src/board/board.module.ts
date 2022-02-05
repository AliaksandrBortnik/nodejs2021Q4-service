import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { boardProviders } from "./board.providers";
import { DatabaseModule } from "../database/database.module";
import { TaskModule } from "../task/task.module";

@Module({
  imports: [DatabaseModule, TaskModule],
  controllers: [BoardController],
  providers: [...boardProviders]
})
export class BoardModule {}
