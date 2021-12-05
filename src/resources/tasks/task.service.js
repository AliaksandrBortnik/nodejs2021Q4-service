const taskRepo = require("./task.repository");

const getAll = async (boardId) => taskRepo.getAllByBoardId(boardId);
const getById = async (boardId, id) => taskRepo.getById(id); // TODO: check if boardId is the same in task payload
const add = async (boardId, task) => taskRepo.add(boardId, task); // TODO: check if boardId is the same in task payload
const update = async (boardId, taskId, task) => taskRepo.update(taskId, task); // TODO: check if boardId is the same in task payload
const remove = async (boardId, id) => taskRepo.remove(id); // TODO: check if boardId is the same in task payload

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
