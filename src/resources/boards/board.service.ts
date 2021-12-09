const boardRepo = require('./board.repository');
const taskRepo = require('../tasks/task.repository');

const getAll = async () => boardRepo.getAll();
const getById = async (id) => boardRepo.getById(id);
const add = async (board) => boardRepo.add(board);
const update = async (id, board) => boardRepo.update(id, board);

const remove = async (id) => {
  const tasks = await taskRepo.getAll();
  const boardTasks = tasks.filter(t => t.boardId === id);
  const tasksRemoveBatch = [];

  for (let i = 0; i < boardTasks.length; i += 1) {
    tasksRemoveBatch.push(taskRepo.remove(boardTasks[i].id));
  }

  if (tasksRemoveBatch.length) {
    await Promise.all(tasksRemoveBatch);
  }

  await boardRepo.remove(id);
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
