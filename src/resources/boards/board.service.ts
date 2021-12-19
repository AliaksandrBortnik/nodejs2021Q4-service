import {BoardRepository} from './board.repository';
import { Board } from "./board.model";
import {TaskService} from "../tasks/task.service";

/**
 * Board's business logic and work with Data Access Layer
 */
export class BoardService {
  boardRepo: BoardRepository;
  taskService: TaskService;

  /**
   * Constructor of BoardService class
   */
  constructor() {
    this.boardRepo = new BoardRepository();
    this.taskService = new TaskService();
  }

  /**
   * Get all boards
   * @returns Returns promise of all existing boards
   */
  async getAll(): Promise<Board[]> {
    return this.boardRepo.getAll();
  }

  /**
   * Get board by id
   * @param id - Board's id
   * @returns Returns promise of a board if found or undefined
   */
  async getById(id: string): Promise<Board | undefined> {
    return this.boardRepo.getById(id);
  }

  /**
   * Add a new board
   * @param board - Board payload
   * @returns Returns promise of a new board
   */
  async add(board: Board): Promise<Board> {
    return this.boardRepo.add(board);
  }

  /**
   * Update the board
   * @param id - Board's id
   * @param board - Board's payload
   * @returns Returns promise of updated board
   */
  async update(id: string, board: Board): Promise<Board> {
    return this.boardRepo.update(id, board);
  }

  /**
   * Removes the board by id
   * @param id - Board's id
   */
  async remove(id: string): Promise<void> {
    await this.taskService.eraseAllTasksOfBoard(id);
    await this.boardRepo.remove(id);
  }
}