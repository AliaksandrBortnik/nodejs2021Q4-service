const BoardService = require('./board.service');

const Column = {
  type: 'object',
  required: ['title', 'order'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    order: { type: 'number' }
  }
}

const Board = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: Column
    }
  }
}

const getAllOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board
      }
    }
  },
  handler: async (_, res) => {
    const boards = await BoardService.getAll();
    res.code(200).send(boards);
  }
}

const getByIdOptions = {
  schema: {
    params: {
      id: { type: 'string', format: 'uuid' }
    },
    response: {
      200: Board
    }
  },
  handler: async (req, res) => {
    const board = await BoardService.getById(req.params.id);

    if (!board) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    res.code(200).send(board);
  }
};

const addOptions = {
  schema: {
    response: {
      201: Board
    }
  },
  handler: async (req, res) => {
    const board = await BoardService.add(req.body);
    res.status(201).send(board);
  }
};

const updateOptions = {
  schema: {
    params: {
      id: { type: 'string', format: 'uuid' }
    },
    response: {
      200: Board
    }
  },
  handler: async (req, res) => {
    const boardExists = !!(await BoardService.getById(req.params.id));

    if (!boardExists) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    const board = await BoardService.update(req.params.id, req.body);
    res.code(200).send(board);
  }
};

const deleteOptions = {
  schema: {
    params: {
      id: { type: 'string', format: 'uuid' }
    },
    response: {
      204: {
        description: 'Removed',
        type: 'null'
      }
    }
  },
  handler: async (req, res) => {
    const boardExists = !!(await BoardService.getById(req.params.id));

    if (!boardExists) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    await BoardService.remove(req.params.id);
    res.code(204);
  }
};

const boardRoutes = (router, _, done) => {
  router.get('/boards', getAllOptions);
  router.get('/boards/:id', getByIdOptions);
  router.post('/boards', addOptions);
  router.put('/boards/:id', updateOptions);
  router.delete('/boards/:id', deleteOptions);
  done();
}

module.exports = boardRoutes;