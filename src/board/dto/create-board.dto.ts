import {OmitType} from "@nestjs/mapped-types";
import {BoardDto} from "./board.dto";

export class CreateBoardDto extends OmitType(BoardDto, ['id'] as const) {}