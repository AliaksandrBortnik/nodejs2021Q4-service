const TaskResponseSchema = {
  type: 'object',
  required: ['title', 'order', 'description'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: 'string', nullable: true, format: 'uuid' },
    boardId: { type: 'string', nullable: true, format: 'uuid' },
    columnId: { type: 'string', nullable: true, format: 'uuid' }
  }
};

export default TaskResponseSchema;