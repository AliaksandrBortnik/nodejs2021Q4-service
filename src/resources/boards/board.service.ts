import {BoardRepository} from './board.repository';
import {TaskRepository} from '../tasks/task.repository';
import { Board } from "./board.model";
import {Task} from "../tasks/task.model";

/**
 * Board's business logic and work with Data Access Layer
 */
export class BoardService {
  boardRepo: BoardRepository;
  taskRepo: TaskRepository;

  /**
   * Constructor of BoardService class
   */
  constructor() {
    this.boardRepo = new BoardRepository();
    this.taskRepo = new TaskRepository();
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
   * @returns Returns promise of a board if found
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
    const boardTasks: Task[] = await this.taskRepo.getAllByBoardId(id);
    const tasksRemoveBatch: Promise<void>[] = [];

    for (let i = 0; i < boardTasks.length; i += 1) {
      tasksRemoveBatch.push(this.taskRepo.remove(boardTasks[i].id));
    }

    if (tasksRemoveBatch.length) {
      await Promise.all(tasksRemoveBatch);
    }

    await this.boardRepo.remove(id);
  }
}