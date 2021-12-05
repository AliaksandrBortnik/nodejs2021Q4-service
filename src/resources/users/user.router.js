const UserService = require("./user.service");

const User = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    login: { type: 'string' }
  }
}

const getAllOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User
      }
    }
  },
  handler: async (_, res) => {
    const users = await UserService.getAll();
    res.code(200).send(users);
  }
}

const getByIdOptions = {
  schema: {
    params: {
      id: { type: 'string', format: 'uuid' }
    },
    response: {
      200: User
    }
  },
  handler: async (req, res) => {
    const user = await UserService.getById(req.params.id);

    if (!user) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    res.code(200).send(user);
  }
};

const addOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' }
      }
    },
    response: {
      201: User
    }
  },
  handler: async (req, res) => {
    const user = await UserService.add(req.body);
    res.status(201).send(user);
  }
};

const updateOptions = {
  schema: {
    params: {
      id: { type: 'string', format: 'uuid' }
    },
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' }
      }
    },
    response: {
      200: User
    }
  },
  handler: async (req, res) => {
    const userExists = !!(await UserService.getById(req.params.id));

    if (!userExists) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    const user = await UserService.update(req.params.id, req.body);
    res.code(200).send(user);
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
    const userExists = !!(await UserService.getById(req.params.id));

    if (!userExists) {
      res.code(404).send({ message: 'Not Found' });
      return;
    }

    await UserService.remove(req.params.id);
    res.code(204);
  }
};

const userRoutes = (router, _, done) => {
  router.get('/users', getAllOptions);
  router.get('/users/:id', getByIdOptions);
  router.post('/users', addOptions);
  router.put('/users/:id', updateOptions);
  router.delete('/users/:id', deleteOptions);
  done();
}

module.exports = userRoutes;