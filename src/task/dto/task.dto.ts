import {IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID} from "class-validator";

export class TaskDto {
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
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  boardId: string;

  @IsOptional()
  @IsUUID()
  columnId: string;
}