const options = require('./board.router-option');

const boardRoutes = (router, _, done) => {
  router.get('/boards', options.getAll);
  router.get('/boards/:id', options.getById);
  router.post('/boards', options.add);
  router.put('/boards/:id', options.update);
  router.delete('/boards/:id', options.remove);
  done();
}

module.exports = boardRoutes;