import {v4 as uuidv4} from 'uuid';
import store from '../../store';
import { Board } from "./board.model";

async function getAll(): Promise<Board[]> {
  return store.boards;
}

async function getById(id: string): Promise<Board | undefined> {
  return store.boards.find(u => u.id === id);
}

async function add(board: Board): Promise<Board> {
  const entity: Board = {...board, id: uuidv4()};
  store.boards.push(entity);
  return entity;
}

async function update(id: string, board: Board): Promise<Board> {
  const index: number = store.boards.findIndex(u => u.id === id);
  store.boards[index] = { ...board, id };
  return store.boards[index];
}

async function remove(id: string): Promise<void> {
  store.boards = store.boards.filter(u => u.id !== id);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};