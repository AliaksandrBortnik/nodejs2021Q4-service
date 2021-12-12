const userRepo = require('./user.repository');
const taskRepo = require('../tasks/task.repository');

const getAll = async () => userRepo.getAll();
const getById = async (id) => userRepo.getById(id);
const add = async (user) => userRepo.add(user);
const update = async (id, user) => userRepo.update(id, user);

const remove = async (id) => {
  const tasks = await taskRepo.getAll();
  const userTasks = tasks.filter(t => t.userId === id);

  const tasksUpdateBatch = [];

  for (let i = 0; i < userTasks.length; i += 1) {
    userTasks[i].userId = null;
    tasksUpdateBatch.push(taskRepo.update(userTasks[i].id, userTasks[i]));
  }

  if (tasksUpdateBatch.length) {
    await Promise.all(tasksUpdateBatch);
  }

  await userRepo.remove(id);
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
