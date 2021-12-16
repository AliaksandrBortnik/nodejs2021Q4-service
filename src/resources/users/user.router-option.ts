import UserController from './user.controller';
import UserResponseSchema from './user-response.schema';

const options = {
  getAll: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: UserResponseSchema
        }
      }
    },
    handler: UserController.getAll
  },
  getById: {
    schema: {
      params: {
        id: { type: 'string', format: 'uuid' }
      },
      response: {
        200: UserResponseSchema
      }
    },
    handler: UserController.getById
  },
  add: {
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
        201: UserResponseSchema
      }
    },
    handler: UserController.add
  },
  update: {
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
        200: UserResponseSchema
      }
    },
    handler: UserController.update
  },
  remove: {
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
    handler: UserController.remove
  }
}

export default options;