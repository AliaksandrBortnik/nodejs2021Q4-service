import {Inject, Injectable} from "@nestjs/common";
import {BoardRepository} from "./board.repository";
import {TaskService} from "../task/task.service";
import {Repository} from "typeorm";
import {BoardEntity} from "./entities/board.entity";

@Injectable()
export class BoardService {
  constructor(
    private readonly taskService: TaskService,
    @Inject('BOARD_REPOSITORY')
    private readonly boardRepo: BoardRepository,
    @Inject('COLUMN_REPOSITORY')
    private readonly columnRepo: Repository<BoardEntity>
  ) {}

  /**
   * Get all boards
   * @returns Returns promise of all existing boards
   */
  async getAll(): Promise<BoardEntity[]> {
    // There is a lack of vital feature using eager loading: https://github.com/typeorm/typeorm/issues/2620
    // return this.boardRepo.find();
    return this.boardRepo
      .createQueryBuilder("board")
      .leftJoinAndSelect("board.columns", "columns")
      .orderBy({ "columns.order": "ASC" })
      .getMany();
  }

  /**
   * Get board by id
   * @param id - Board's id
   * @returns Returns promise of a board if found or undefined
   */
  async getById(id: string): Promise<BoardEntity | undefined> {
    // There is a lack of vital feature using eager loading: https://github.com/typeorm/typeorm/issues/2620
    // return this.boardRepo.findOne(id);
    return this.boardRepo
      .createQueryBuilder("board")
      .where("board.id = :id", { id })
      .leftJoinAndSelect("board.columns", "columns")
      .orderBy({ "columns.order": "ASC" })
      .getOne();
  }

  /**
   * Add or update a board
   * @param board - Board payload
   * @returns Returns promise of a new board
   */
  async addOrUpdate(board: BoardEntity): Promise<BoardEntity> {
    return this.boardRepo.save(board);
  }

  /**
   * Removes the board by id
   * @param id - Board's id
   */
  async remove(id: string): Promise<void> {
    await this.boardRepo.delete(id);
  }
}