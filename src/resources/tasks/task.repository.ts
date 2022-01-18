import { Task } from "../../entity/task.model";
import {EntityRepository, Repository} from "typeorm";

/**
 * Task's repository to work with DB
 */
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  /**
   * Get all tasks by boardId from DB
   * @param boardId - Board's id
   * @returns Returns promise of all existing tasks of the board
   */
  async getAllByBoardId(boardId: string): Promise<Task[]> {
    return this.find({ where: { board: { id: boardId }}});
  }
}