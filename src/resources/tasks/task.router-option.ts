const TaskController = require('./task.controller');
const Task = require('./task.schema');

const options = {
  getAll: {
    schema: {
      params: {
        boardId: { type: 'string', format: 'uuid' }
      },
      response: {
        200: {
          type: 'array',
            items: Task
        }
      }
    },
    handler: TaskController.getAll
  },
  getById: {
    schema: {
      params: {
        boardId: { type: 'string', format: 'uuid' },
        taskId: { type: 'string', format: 'uuid' }
      },
      response: {
        200: Task
      }
    },
    handler: TaskController.getById
  },
  add: {
    schema: {
      params: {
        boardId: { type: 'string', format: 'uuid' }
      },
      body: {
        type: 'object',
        required: ['title', 'order', 'description', 'userId', 'boardId'],
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: 'string', nullable: true, format: 'uuid' },
          boardId: { type: 'string', nullable: true, format: 'uuid' },
          columnId: { type: 'string', nullable: true, format: 'uuid' }
        }
      },
      response: {
        201: Task
      }
    },
    handler: TaskController.add
  },
  update: {
    schema: {
      params: {
        boardId: { type: 'string', format: 'uuid' },
        taskId: { type: 'string', format: 'uuid' }
      },
      body: {
        type: 'object',
        required: ['title', 'order', 'description', 'userId', 'boardId', 'columnId'],
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: 'string', nullable: true, format: 'uuid' },
          boardId: { type: 'string', nullable: true, format: 'uuid' },
          columnId: { type: 'string', nullable: true, format: 'uuid' }
        }
      },
      response: {
        200: Task
      }
    },
    handler: TaskController.update
  },
  remove: {
    schema: {
      params: {
        boardId: { type: 'string', format: 'uuid' },
        taskId: { type: 'string', format: 'uuid' }
      },
      response: {
        204: {
          description: 'Removed',
          type: 'null'
        }
      }
    },
    handler: TaskController.remove
  }
}

module.exports = options;