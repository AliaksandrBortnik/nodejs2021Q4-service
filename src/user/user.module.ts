import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {userProviders} from "./user.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [...userProviders]
})
export class UserModule {}
