const userRepo = require('./user.repository');

const getAll = () => userRepo.getAll();
const getById = (id) => userRepo.getById(id);
const add = (user) => userRepo.add(user);
const update = (id, user) => userRepo.update(id, user);
const remove = (id) => userRepo.remove(id);

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
