const options = require('./user.router-option');

const userRoutes = (router, _, done) => {
  router.get('/users', options.getAll);
  router.get('/users/:id', options.getById);
  router.post('/users', options.add);
  router.put('/users/:id', options.update);
  router.delete('/users/:id', options.remove);
  done();
};

module.exports = userRoutes;