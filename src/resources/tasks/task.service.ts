const taskRepo = require("./task.repository");

const getAll = async (boardId) => taskRepo.getAllByBoardId(boardId);
const getById = async (boardId, id) => taskRepo.getById(id);
const add = async (boardId, task) => taskRepo.add(boardId, task);
const update = async (boardId, taskId, task) => taskRepo.update(taskId, task);
const remove = async (boardId, id) => taskRepo.remove(id);

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
