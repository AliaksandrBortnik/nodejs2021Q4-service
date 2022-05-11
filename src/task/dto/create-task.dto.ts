import {OmitType} from "@nestjs/mapped-types";
import {TaskDto} from "./task.dto";

export class CreateTaskDto extends OmitType(TaskDto, ['id'] as const) {}
