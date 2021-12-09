const UserService = require("./user.service");

async function getAll(_, res) {
  const users = await UserService.getAll();
  res.code(200).send(users);
}

async function getById(req, res) {
  const user = await UserService.getById(req.params.id);

  if (!user) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  res.code(200).send(user);
}

async function add(req, res) {
  const user = await UserService.add(req.body);
  res.status(201).send(user);
}

async function update(req, res) {
  const userExists = !!(await UserService.getById(req.params.id));

  if (!userExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  const user = await UserService.update(req.params.id, req.body);
  res.code(200).send(user);
}

async function remove(req, res) {
  const userExists = !!(await UserService.getById(req.params.id));

  if (!userExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

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

