const options = require('./task.router-option');

const taskRoutes = (router, _, done) => {
  router.get('/boards/:boardId/tasks', options.getAll);
  router.get('/boards/:boardId/tasks/:taskId', options.getById);
  router.post('/boards/:boardId/tasks', options.add);
  router.put('/boards/:boardId/tasks/:taskId', options.update);
  router.delete('/boards/:boardId/tasks/:taskId', options.remove);
  done();
};

module.exports = taskRoutes;