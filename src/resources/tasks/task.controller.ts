const TaskService = require('./task.service');

async function getAll(req, res) {
  const tasks = await TaskService.getAll(req.params.boardId);
  res.code(200).send(tasks);
}

async function getById(req, res) {
  const task = await TaskService.getById(req.params.boardId, req.params.taskId);

  if (!task) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  res.code(200).send(task);
}

async function add(req, res) {
  const task = await TaskService.add(req.params.boardId, req.body);
  res.status(201).send(task);
}

async function update(req, res) {
  const taskExists = !!(await TaskService.getById(req.params.boardId, req.params.taskId));

  if (!taskExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  const task = await TaskService.update(req.params.boardId, req.params.taskId, req.body);
  res.code(200).send(task);
}

async function remove(req, res) {
  const taskExists = !!(await TaskService.getById(req.params.boardId, req.params.taskId));

  if (!taskExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  await TaskService.remove(req.params.boardId, req.params.taskId);
  res.code(204);
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};