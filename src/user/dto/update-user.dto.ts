import {IsNotEmpty, IsUUID} from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
