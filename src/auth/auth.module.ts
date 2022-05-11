import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {APP_GUARD} from "@nestjs/core";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {config} from "../common/config";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.register(({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: '12h' }
    }))
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ]
})
export class AuthModule {}
