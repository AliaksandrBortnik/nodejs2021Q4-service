import BoardResponseSchema from './schemas/board-response.schema';
import ColumnResponseSchema from './schemas/column-response.schema';
import {BoardController} from './board.controller';
import {BoardFastifyRequest} from "./board.request";
import {FastifyReply} from "fastify";

const options = {
  getAll: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: BoardResponseSchema
        }
      }
    },
    /**
     * Get all boards handler
     * @param req - request
     * @param res - response
     */
    handler: (req: BoardFastifyRequest, res: FastifyReply) =>
      new BoardController(req, res).getAll()
  },
  getById: {
    schema: {
      params: {
        id: { type: 'string', format: 'uuid' }
      },
      response: {
        200: BoardResponseSchema
      }
    },
    /**
     * Get board by ID handler
     * @param req - request
     * @param res - response
     */
    handler: (req: BoardFastifyRequest, res: FastifyReply) =>
      new BoardController(req, res).getById()
  },
  add: {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'columns'],
        properties: {
          title: { type: 'string' },
          columns: {
            type: 'array',
            items: ColumnResponseSchema
          }
        }
      },
      response: {
        201: BoardResponseSchema
      }
    },
    /**
     * Add board handler
     * @param req - request
     * @param res - response
     */
    handler: (req: BoardFastifyRequest, res: FastifyReply) =>
      new BoardController(req, res).add()
  },
  update: {
    schema: {
      params: {
        id: { type: 'string', format: 'uuid' }
      },
      body: {
        type: 'object',
        required: ['title', 'columns'],
        properties: {
          title: { type: 'string' },
          columns: {
            type: 'array',
            items: ColumnResponseSchema
          }
        }
      },
      response: {
        200: BoardResponseSchema
      }
    },
    /**
     * Update board handler
     * @param req - request
     * @param res - response
     */
    handler: (req: BoardFastifyRequest, res: FastifyReply) =>
      new BoardController(req, res).update()
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
     * Remove board handler
     * @param req - request
     * @param res - response
     */
    handler: (req: BoardFastifyRequest, res: FastifyReply) =>
      new BoardController(req, res).remove()
  }
};

export default options;