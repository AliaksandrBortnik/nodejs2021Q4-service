const BoardService = require('./board.service');

async function getAll(_, res) {
  const boards = await BoardService.getAll();
  res.code(200).send(boards);
}

async function getById(req, res) {
  const board = await BoardService.getById(req.params.id);

  if (!board) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  res.code(200).send(board);
}

async function add(req, res) {
  const board = await BoardService.add(req.body);
  res.status(201).send(board);
}

async function update(req, res) {
  const boardExists = !!(await BoardService.getById(req.params.id));

  if (!boardExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  const board = await BoardService.update(req.params.id, req.body);
  res.code(200).send(board);
}

async function remove(req, res) {
  const boardExists = !!(await BoardService.getById(req.params.id));

  if (!boardExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  await BoardService.remove(req.params.id);
  res.code(204);
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};