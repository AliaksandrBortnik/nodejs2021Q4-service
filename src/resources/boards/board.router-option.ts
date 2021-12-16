import BoardResponseSchema from './schemas/board-response.schema';
import ColumnResponseSchema from './schemas/column-response.schema';
import BoardController from './board.controller';

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
    handler: BoardController.getAll
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
    handler: BoardController.getById
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
    handler: BoardController.add
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
    handler: BoardController.update
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
    handler: BoardController.remove
  }
};

export default options;