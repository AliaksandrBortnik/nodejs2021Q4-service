const ColumnSchema = {
  type: 'object',
  required: ['title', 'order'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    order: { type: 'number' }
  }
};

export default ColumnSchema;