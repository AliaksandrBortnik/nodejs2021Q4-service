const UserService = require('./user.service');

const getAll = async (_, res) => {
  const users = await UserService.getAll();
  res.code(200).send(users);
}

const getById = async (req, res) => {
  const user = await UserService.getById(req.params.id);

  if (!user) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  res.code(200).send(user);
}

const add = async (req, res) => {
  const user = await UserService.add(req.body);
  res.status(201).send(user);
}

const update = async (req, res) => {
  const user = await UserService.update(req.params.id, req.body);
  res.code(200).send(user);
}

const remove = async (req, res) => {
  await UserService.remove(req.params.id);
  res.code(204);
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};