const { v4: uuidv4 } = require('uuid');
const db = require('../../db');

const getAll = async () => db.tasks;

const getAllByBoardId = async (boardId) => db.tasks.filter(t => t.boardId === boardId);

const getById = async (id) => db.tasks.find(u => u.id === id);

const add = async (boardId, task) => {
  const entity = { id: uuidv4(), ...task };
  entity.boardId = boardId;
  db.tasks.push(entity);
  return entity;
};

const update = async (id, task) => {
  const index = db.tasks.findIndex(u => u.id === id);
  db.tasks[index] = { id, ...task };
  return db.tasks[index];
};

const remove = async (id) => {
  db.tasks = db.tasks.filter(u => u.id !== id);
}

module.exports = {
  getAll,
  getAllByBoardId,
  getById,
  add,
  update,
  remove
};