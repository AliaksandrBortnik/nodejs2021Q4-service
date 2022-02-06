import {IsInt, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class TaskDto {
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