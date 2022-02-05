import {TaskEntity} from "./entities/task.entity";
import {EntityRepository, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

/**
 * Task's repository to work with DB
 */
@Injectable()
@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  /**
   * Get all tasks by boardId from DB
   * @param boardId - Board's id
   * @returns Returns promise of all existing tasks of the board
   */
  async getAllByBoardId(boardId: string): Promise<TaskEntity[]> {
    return this.find({ where: { board: { id: boardId }}});
  }
}