import {Inject, Injectable} from "@nestjs/common";
import {BoardRepository} from "./board.repository";
import {TaskService} from "../task/task.service";
import {Repository} from "typeorm";
import {BoardEntity} from "./entities/board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardDto} from "./dto/board.dto";
import {BoardColumnEntity} from "./entities/board-column.entity";
import {BoardColumnDto} from "./dto/board-column.dto";

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
  async getAll(): Promise<BoardDto[]> {
    // There is a lack of vital feature using eager loading: https://github.com/typeorm/typeorm/issues/2620
    // return this.boardRepo.find();
    const entities = await this.boardRepo
      .createQueryBuilder("board")
      .leftJoinAndSelect("board.columns", "columns")
      .orderBy({ "columns.order": "ASC" })
      .getMany();

    return entities.map(this.mapBoardEntityToDto);
  }

  /**
   * Get board by id
   * @param id - Board's id
   * @returns Returns promise of a board if found or undefined
   */
  async getById(id: string): Promise<BoardDto | undefined> {
    // There is a lack of vital feature using eager loading: https://github.com/typeorm/typeorm/issues/2620
    // return this.boardRepo.findOne(id);
    const entity = await this.boardRepo
      .createQueryBuilder("board")
      .where("board.id = :id", { id })
      .leftJoinAndSelect("board.columns", "columns")
      .orderBy({ "columns.order": "ASC" })
      .getOne();

    return entity && this.mapBoardEntityToDto(entity);
  }

  /**
   * Add or update a board
   * @param board - Board payload
   * @returns Returns promise of a new board
   */
  async addOrUpdate(board: CreateBoardDto | BoardDto): Promise<BoardDto> {
    const entity = await this.boardRepo.save(board);
    return this.mapBoardEntityToDto(entity);
  }

  /**
   * Removes the board by id
   * @param id - Board's id
   */
  async remove(id: string): Promise<void> {
    await this.boardRepo.delete(id);
  }

  mapBoardEntityToDto(entity: BoardEntity): BoardDto {
    const mapColumnEntityToDto = (entity: BoardColumnEntity): BoardColumnDto => {
      return {
        id: entity.id,
        title: entity.title,
        order: entity.order,
        boardId: entity.boardId!
      }
    };

    return {
      id: entity.id,
      title: entity.title,
      columns: entity.columns.map(mapColumnEntityToDto)
    }
  }
}