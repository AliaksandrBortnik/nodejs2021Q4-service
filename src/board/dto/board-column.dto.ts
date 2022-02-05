import {IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";

export class BoardColumnDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsUUID()
  boardId: string;
}