const { v4: uuidv4 } = require('uuid');
const db = require('../../db');

const getAll = async () => db.users;

const getById = async (id) => db.users.find(u => u.id === id);

const add = async (user) => {
  const newUser = { id: uuidv4(), ...user };
  db.users.push(newUser);
  return newUser;
};

const update = async (id, user) => {
  const index = db.users.findIndex(u => u.id === id);
  db.users[index] = { id, ...user };
  return db.users[index];
};

const remove = async (id) => {
  db.users = db.users.filter(u => u.id !== id);
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};