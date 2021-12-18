import {TaskController} from './task.controller';
import TaskResponseSchema from './task-response.schema';
import {TaskFastifyRequest} from "./task.request";
import {FastifyReply} from "fastify";

export const taskRouterOption = {
  getAll: {
    schema: {
      params: {
        boardId: {type: 'string', format: 'uuid'}
      },
      response: {
        200: {
          type: 'array',
          items: TaskResponseSchema
        }
      }
    },
    /**
     * Get all tasks of the board handler
     * @param req - request
     * @param res - response
     */
    handler: (req: TaskFastifyRequest, res: FastifyReply) =>
      new TaskController(req, res).getAllByBoardId()
  },
  getById: {
    schema: {
      params: {
        boardId: {type: 'string', format: 'uuid'},
        taskId: {type: 'string', format: 'uuid'}
      },
      response: {
        200: TaskResponseSchema
      }
    },
    /**
     * Get task by ID handler
     * @param req - request
     * @param res - response
     */
    handler: (req: TaskFastifyRequest, res: FastifyReply) =>
      new TaskController(req, res).getById()
  },
  add: {
    schema: {
      params: {
        boardId: {type: 'string', format: 'uuid'}
      },
      body: {
        type: 'object',
        required: ['title', 'order', 'description', 'userId', 'boardId'],
        properties: {
          title: {type: 'string'},
          order: {type: 'number'},
          description: {type: 'string'},
          userId: {type: 'string', nullable: true, format: 'uuid'},
          boardId: {type: 'string', nullable: true, format: 'uuid'},
          columnId: {type: 'string', nullable: true, format: 'uuid'}
        }
      },
      response: {
        201: TaskResponseSchema
      }
    },
    /**
     * Add task handler
     * @param req - request
     * @param res - response
     */
    handler: (req: TaskFastifyRequest, res: FastifyReply) =>
      new TaskController(req, res).add()
  },
  update: {
    schema: {
      params: {
        boardId: {type: 'string', format: 'uuid'},
        taskId: {type: 'string', format: 'uuid'}
      },
      body: {
        type: 'object',
        required: ['title', 'order', 'description', 'userId', 'boardId', 'columnId'],
        properties: {
          title: {type: 'string'},
          order: {type: 'number'},
          description: {type: 'string'},
          userId: {type: 'string', nullable: true, format: 'uuid'},
          boardId: {type: 'string', nullable: true, format: 'uuid'},
          columnId: {type: 'string', nullable: true, format: 'uuid'}
        }
      },
      response: {
        200: TaskResponseSchema
      }
    },
    /**
     * Update task handler
     * @param req - request
     * @param res - response
     */
    handler: (req: TaskFastifyRequest, res: FastifyReply) =>
      new TaskController(req, res).update()
  },
  remove: {
    schema: {
      params: {
        boardId: {type: 'string', format: 'uuid'},
        taskId: {type: 'string', format: 'uuid'}
      },
      response: {
        204: {
          description: 'Removed',
          type: 'null'
        }
      }
    },
    /**
     * Remove task handler
     * @param req - request
     * @param res - response
     */
    handler: (req: TaskFastifyRequest, res: FastifyReply) =>
      new TaskController(req, res).remove()
  }
};