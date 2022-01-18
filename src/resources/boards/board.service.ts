import {BoardRepository} from './board.repository';
import { Board } from "../../entity/board.model";
import {TaskService} from "../tasks/task.service";
import {getCustomRepository, getRepository, Repository} from "typeorm";
import {BoardColumn} from "../../entity/board-column.model";

/**
 * Board's business logic and work with Data Access Layer
 */
export class BoardService {
  boardRepo: BoardRepository;
  columnRepo: Repository<BoardColumn>;
  taskService: TaskService;

  constructor() {
    this.boardRepo = getCustomRepository(BoardRepository);
    this.columnRepo = getRepository(BoardColumn);
    this.taskService = new TaskService();
  }

  /**
   * Get all boards
   * @returns Returns promise of all existing boards
   */
  async getAll(): Promise<Board[]> {
    return this.boardRepo.find();
  }

  /**
   * Get board by id
   * @param id - Board's id
   * @returns Returns promise of a board if found or undefined
   */
  async getById(id: string): Promise<Board | undefined> {
    return this.boardRepo.findOne(id);
  }

  /**
   * Add or update a board
   * @param board - Board payload
   * @returns Returns promise of a new board
   */
  async addOrUpdate(board: Board): Promise<Board> {
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