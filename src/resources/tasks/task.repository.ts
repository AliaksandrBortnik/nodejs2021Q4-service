import {v4 as uuidv4} from "uuid";
import store from '../../store';
import Task from "./task.model";

async function getAll(): Promise<Task[]> {
  return store.tasks;
}

async function getAllByBoardId(boardId: string) {
  return store.tasks.filter(t => t.boardId === boardId);
}

async function getById(id: string) {
  return store.tasks.find(u => u.id === id);
}

async function add(boardId: string, task: Task): Promise<Task> {
  const entity: Task = { ...task, id: uuidv4() };
  entity.boardId = boardId;
  store.tasks.push(entity);
  return entity;
}

async function update(id: string, task: Task): Promise<Task> {
  const index = store.tasks.findIndex(u => u.id === id);
  store.tasks[index] = { ...task, id };
  return store.tasks[index];
}

async function remove(id: string): Promise<void> {
  store.tasks = store.tasks.filter(u => u.id !== id);
}

export default {
  getAll,
  getAllByBoardId,
  getById,
  add,
  update,
  remove
};