const TaskService = require('./task.service');

const Task = {
  type: 'object',
  required: ['title', 'order', 'description'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: 'string', nullable: true, format: 'uuid' },
    boardId: { type: 'string', nullable: true, format: 'uuid' },
    columnId: { type: 'string', nullable: true, format: 'uuid' }
  }
}

const getAllOptions = {
  schema: {
    params: {
      boardId: { type: 'string', format: 'uuid' }
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
      boardId: { type: 'string', format: 'uuid' },
      taskId: { type: 'string', format: 'uuid' }
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
      boardId: { type: 'string', format: 'uuid' }
    },
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId'],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: 'string', nullable: true, format: 'uuid' },
        boardId: { type: 'string', nullable: true, format: 'uuid' },
        columnId: { type: 'string', nullable: true, format: 'uuid' }
      }
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
      boardId: { type: 'string', format: 'uuid' },
      taskId: { type: 'string', format: 'uuid' }
    },
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId', 'columnId'],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: 'string', nullable: true, format: 'uuid' },
        boardId: { type: 'string', nullable: true, format: 'uuid' },
        columnId: { type: 'string', nullable: true, format: 'uuid' }
      }
    },
    response: {
      200: Task
    }
  },
  handler: async (req, res) => {
    const taskExists = !!(await TaskService.getById(req.params.boardId, req.params.taskId));

    if (!taskExists) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    const task = await TaskService.update(req.params.boardId, req.params.taskId, req.body);
    res.code(200).send(task);
  }
};

const deleteOptions = {
  schema: {
    params: {
      boardId: { type: 'string', format: 'uuid' },
      taskId: { type: 'string', format: 'uuid' }
    },
    response: {
      204: {
        description: 'Removed',
        type: 'null'
      }
    }
  },
  handler: async (req, res) => {
    const taskExists = !!(await TaskService.getById(req.params.boardId, req.params.taskId));

    if (!taskExists) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

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