import {UserController} from './user.controller';
import UserResponseSchema from './user-response.schema';
import {FastifyReply} from "fastify";
import {UserFastifyRequest} from "./user.request";

export const userRouterOption = {
  getAll: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: UserResponseSchema
        }
      }
    },
    /**
     * Get all users handler
     * @param req - request object
     * @param res - response object
     */
    handler: (req: UserFastifyRequest, res: FastifyReply): Promise<void> =>
      new UserController(req, res).getAll()
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
    /**
     * Get user by ID handler
     * @param req - request object
     * @param res - response object
     */
    handler: (req: UserFastifyRequest, res: FastifyReply): Promise<void> =>
      new UserController(req, res).getById()
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
    /**
     * Add user handler
     * @param req - request object
     * @param res - response object
     */
    handler: (req: UserFastifyRequest, res: FastifyReply): Promise<void> =>
      new UserController(req, res).add()
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
    /**
     * Update user handler
     * @param req - request object
     * @param res - response object
     */
    handler: (req: UserFastifyRequest, res: FastifyReply): Promise<void> =>
      new UserController(req, res).update()
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
    /**
     * Remove user handler
     * @param req - request object
     * @param res - response object
     */
    handler: (req: UserFastifyRequest, res: FastifyReply): Promise<void> =>
      new UserController(req, res).remove()
  }
};