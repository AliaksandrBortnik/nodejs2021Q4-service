import boardRepo from './board.repository';
import taskRepo from '../tasks/task.repository';
import Board from "resources/boards/board.model";
import Task from "resources/tasks/task.model";

async function getAll(): Promise<Board[]> {
  return boardRepo.getAll();
}

async function getById(id: string): Promise<Board | undefined> {
  return boardRepo.getById(id);
}

async function add(board: Board): Promise<Board> {
  return boardRepo.add(board);
}

async function update(id: string, board: Board): Promise<Board> {
  return boardRepo.update(id, board);
}

async function remove(id: string): Promise<void> {
  const tasks: Task[] = await taskRepo.getAll();
  const boardTasks: Task[] = tasks.filter(t => t.boardId === id);
  const tasksRemoveBatch: Promise<void>[] = [];

  for (let i = 0; i < boardTasks.length; i += 1) {
    tasksRemoveBatch.push(taskRepo.remove(boardTasks[i].id));
  }

  if (tasksRemoveBatch.length) {
    await Promise.all(tasksRemoveBatch);
  }

  await boardRepo.remove(id);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};
