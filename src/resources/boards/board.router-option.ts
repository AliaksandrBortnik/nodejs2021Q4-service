import BoardSchema from './schemas/board.schema';
import ColumnSchema from './schemas/column.schema';
import BoardController from './board.controller';

const options = {
  getAll: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: BoardSchema
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
        200: BoardSchema
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
            items: ColumnSchema
          }
        }
      },
      response: {
        201: BoardSchema
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
            items: ColumnSchema
          }
        }
      },
      response: {
        200: BoardSchema
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