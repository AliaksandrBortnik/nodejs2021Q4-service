const UserController = require('./user.controller');

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' }
    // Skipped password
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
  handler: UserController.getAll
}

const getByIdOptions = {
  schema: {
    params: {
      id: { type: 'string' } // TODO: make sure it is UUID
    },
    response: {
      200: User
    }
  },
  handler: UserController.getById
};

const addOptions = {
  schema: {
    response: {
      201: User
    }
  },
  handler: UserController.add
};

const updateOptions = {
  schema: {
    params: {
      id: { type: 'string' } // TODO: make sure it is UUID
    },
    response: {
      200: User
    }
  },
  handler: UserController.update
};

const deleteOptions = {
  schema: {
    params: {
      id: { type: 'string' } // TODO: make sure it is UUID
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
  handler: UserController.remove
};

const userRoutes = (fastify, options, done) => {
  fastify.get('/users', getAllOptions);
  fastify.get('/users/:id', getByIdOptions);
  fastify.post('/users', addOptions);
  fastify.put('/users/:id', updateOptions);
  fastify.delete('/users/:id', deleteOptions);
  done();
}

module.exports = userRoutes;