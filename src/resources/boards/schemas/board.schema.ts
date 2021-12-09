import ColumnSchema from './column.schema';

const BoardSchema = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: ColumnSchema
    }
  }
};

export default BoardSchema;