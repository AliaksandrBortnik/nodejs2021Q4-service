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

  /**
   * Constructor of BoardService class
   */
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
    return await this.boardRepo.find();
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
   * Add a new board
   * @param board - Board payload
   * @returns Returns promise of a new board
   */
  async add(board: Board): Promise<Board> {
    const columns = await this.columnRepo.save(board.columns);
    const updatedBoard = await this.boardRepo.save(board);
    updatedBoard.columns = columns
    return Promise.resolve(updatedBoard);
  }

  /**
   * Update the board
   * @param id - Board's id
   * @param board - Board's payload
   * @returns Returns promise of updated board
   */
  async update(id: string, board: Board): Promise<Board> {
    // await this.boardRepo.update(id, board);
    // return Promise.resolve(board);
    const columns = await this.columnRepo.save(board.columns);
    const updatedBoard = await this.boardRepo.save(board); // id, board
    updatedBoard.columns = columns

    return Promise.resolve(updatedBoard);
  }

  /**
   * Removes the board by id
   * @param id - Board's id
   */
  async remove(id: string): Promise<void> {
    // await this.taskService.eraseAllTasksOfBoard(id); // TODO: return back
    await this.boardRepo.delete(id);
  }
}