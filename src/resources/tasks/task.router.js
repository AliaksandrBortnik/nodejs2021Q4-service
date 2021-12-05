const TaskService = require('./task.service');

const Task = {
  type: 'object',
  required: ['title', 'order', 'description'],
  properties: {
    id: { type: 'string' }, // TODO: check if UUID
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: 'string', nullable: true }, // TODO: check if UUID
    boardId: { type: 'string', nullable: true }, // TODO: check if UUID
    columnId: { type: 'string', nullable: true } // TODO: check if UUID
  }
}

const getAllOptions = {
  schema: {
    params: {
      boardId: { type: 'string' } // TODO: make sure it is UUID
    },
    response: {
      200: {
        type: 'array',
        items: Task
      }
    }
  },
  handler: async (req, res) => {
    const tasks = await TaskService.getAll(req.params.boardId);
    res.code(200).send(tasks);
  }
}

const getByIdOptions = {
  schema: {
    params: {
      boardId: { type: 'string' }, // TODO: make sure it is UUID
      taskId: { type: 'string' } // TODO: make sure it is UUID
    },
    response: {
      200: Task
    }
  },
  handler: async (req, res) => {
    const task = await TaskService.getById(req.params.boardId, req.params.taskId);

    if (!task) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    res.code(200).send(task);
  }
};

const addOptions = {
  schema: {
    params: {
      boardId: { type: 'string' } // TODO: make sure it is UUID
    },
    response: {
      201: Task
    }
  },
  handler: async (req, res) => {
    const task = await TaskService.add(req.params.boardId, req.body);
    res.status(201).send(task);
  }
};

const updateOptions = {
  schema: {
    params: {
      boardId: { type: 'string' }, // TODO: make sure it is UUID
      taskId: { type: 'string' } // TODO: make sure it is UUID
    },
    response: {
      200: Task
    }
  },
  handler: async (req, res) => {
    const task = await TaskService.update(req.params.boardId, req.params.taskId, req.body);
    res.code(200).send(task);
  }
};

const deleteOptions = {
  schema: {
    params: {
      boardId: { type: 'string' }, // TODO: make sure it is UUID
      taskId: { type: 'string' } // TODO: make sure it is UUID
    },
    response: {
      204: {
        type: 'object',  // TODO: how to make empty response? Otherwise, add message in response by DELETE request
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: async (req, res) => {
    await TaskService.remove(req.params.boardId, req.params.taskId);
    res.code(204);
  }
};

const taskRoutes = (router, _, done) => {
  router.get('/boards/:boardId/tasks', getAllOptions);
  router.get('/boards/:boardId/tasks/:taskId', getByIdOptions);
  router.post('/boards/:boardId/tasks', addOptions);
  router.put('/boards/:boardId/tasks/:taskId', updateOptions);
  router.delete('/boards/:boardId/tasks/:taskId', deleteOptions);
  done();
}

module.exports = taskRoutes;