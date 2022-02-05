import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {BoardModule} from "./board/board.module";
import {TaskModule} from "./task/task.module";
import {DatabaseModule} from "./database/database.module";
import {AuthModule} from "./auth/auth.module";
import {APP_FILTER} from "@nestjs/core";
import {AllExceptionsFilter} from "./all-exception.filter";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    BoardModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [
    // TODO: return back. it hides validation message in response
    // { provide: APP_FILTER, useClass: AllExceptionsFilter },
    AppService
  ],
})
export class AppModule {}
