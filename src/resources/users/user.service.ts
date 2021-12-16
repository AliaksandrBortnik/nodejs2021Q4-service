import User from "./user.model";
import userRepo from './user.repository';
import taskRepo from '../tasks/task.repository';
import Task from "../../resources/tasks/task.model";

async function getAll(): Promise<User[]> {
  return await userRepo.getAll();
}

async function getById(id: string): Promise<User | undefined> {
  return await userRepo.getById(id);
}

async function add(user: User): Promise<User> {
  return userRepo.add(user);
}

async function update(id: string, user: User) {
  return userRepo.update(id, user);
}

async function remove(id: string): Promise<void> {
  const tasks: Task[] = await taskRepo.getAll();
  const userTasks: Task[] = tasks.filter(t => t.userId === id);

  const tasksUpdateBatch: Promise<Task>[] = [];

  for (let i = 0; i < userTasks.length; i += 1) {
    userTasks[i].userId = null;
    tasksUpdateBatch.push(taskRepo.update(userTasks[i].id, userTasks[i]));
  }

  if (tasksUpdateBatch.length) {
    await Promise.all(tasksUpdateBatch);
  }

  await userRepo.remove(id);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};
