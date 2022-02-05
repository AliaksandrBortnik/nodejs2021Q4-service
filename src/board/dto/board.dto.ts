import {IsArray, IsNotEmpty, IsString, IsUUID} from "class-validator";
import {BoardColumnDto} from "./board-column.dto";

export class BoardDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  columns: BoardColumnDto[];
}
