const Column = require('./column.schema');

const Board = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: Column
    }
  }
}

module.exports = Board;