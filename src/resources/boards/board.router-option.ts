const Board = require('./schemas/board.schema');
const Column = require('./schemas/column.schema');
const BoardController = require('./board.controller');

const options = {
  getAll: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: Board
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
        200: Board
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
            items: Column
          }
        }
      },
      response: {
        201: Board
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
            items: Column
          }
        }
      },
      response: {
        200: Board
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

module.exports = options;