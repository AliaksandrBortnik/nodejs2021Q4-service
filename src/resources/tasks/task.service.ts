import taskRepo from "./task.repository";
import Task from "resources/tasks/task.model";

async function getAll(boardId: string): Promise<Task[]> {
  return taskRepo.getAllByBoardId(boardId);
}

async function getById(boardId: string, id: string): Promise<Task | undefined> {
  return taskRepo.getById(id);
}

async function add(boardId: string, task: Task): Promise<Task> {
  return taskRepo.add(boardId, task);
}

async function update(boardId: string, taskId: string, task: Task): Promise<Task> {
  return taskRepo.update(taskId, task);
}

async function remove(boardId: string, id: string): Promise<void> {
  return taskRepo.remove(id);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};
