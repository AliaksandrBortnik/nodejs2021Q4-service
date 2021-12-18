import {v4 as uuidv4} from 'uuid';
import {store} from '../../store';
import {Board} from "./board.model";

/**
 * Board's repository to work with DB
 */
export class BoardRepository {
  /**
   * Get all boards from DB
   * @returns Returns promise of all existing boards
   */
  async getAll(): Promise<Board[]> {
    return store.boards;
  }

  /**
   * Get board by id from DB
   * @param id - Board's id
   * @returns Returns promise of a board if found
   */
  async getById(id: string): Promise<Board | undefined> {
    return store.boards.find(u => u.id === id);
  }

  /**
   * Add a new board to DB
   * @param board - Board payload
   * @returns Returns promise of a new board
   */
  async add(board: Board): Promise<Board> {
    const newBoard: Board = {...board, id: uuidv4()};

    for (const column of newBoard.columns) {
      column.id = uuidv4();
    }

    store.boards.push(newBoard);
    return newBoard;
  }

  /**
   * Update the board in DB
   * @param id - Board's id
   * @param board - Board's payload
   * @returns Returns promise of updated board
   */
  async update(id: string, board: Board): Promise<Board> {
    const index: number = store.boards.findIndex(u => u.id === id);
    store.boards[index] = { ...board, id };
    return store.boards[index];
  }

  /**
   * Removes the board by id from DB
   * @param id - Board's id
   */
  async remove(id: string): Promise<void> {
    store.boards = store.boards.filter(u => u.id !== id);
  }
}