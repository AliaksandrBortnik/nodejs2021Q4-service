const { v4: uuidv4 } = require('uuid');
const db = require('../../db');

const getAll = async () => db.boards;

const getById = async (id) => db.boards.find(u => u.id === id);

const add = async (board) => {
  const entity = { id: uuidv4(), ...board };
  db.boards.push(entity);
  return entity;
};

const update = async (id, board) => {
  const index = db.boards.findIndex(u => u.id === id);
  db.boards[index] = { id, ...board };
  return db.boards[index];
};

const remove = async (id) => {
  db.boards = db.boards.filter(u => u.id !== id);
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};