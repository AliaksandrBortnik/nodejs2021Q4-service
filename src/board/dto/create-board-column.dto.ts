import {OmitType} from "@nestjs/mapped-types";
import {BoardColumnDto} from "./board-column.dto";

export class CreateBoardColumnDto extends
  OmitType(BoardColumnDto, ['id', 'boardId'] as const) {}