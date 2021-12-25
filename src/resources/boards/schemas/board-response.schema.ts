import ColumnResponseSchema from './column-response.schema';

const BoardResponseSchema = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: ColumnResponseSchema
    }
  }
};

export default BoardResponseSchema;