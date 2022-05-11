import {IsInt, IsNotEmpty, IsString, IsUUID} from "class-validator";

export class BoardColumnDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsUUID()
  boardId: string;
}