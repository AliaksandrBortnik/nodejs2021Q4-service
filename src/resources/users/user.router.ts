import { FastifyInstance, FastifyPluginAsync } from "fastify";
import options from './user.router-option';

const userRoutes: FastifyPluginAsync = async (router: FastifyInstance) => {
  router.get('/users', options.getAll);
  router.get('/users/:id', options.getById);
  router.post('/users', options.add);
  router.put('/users/:id', options.update);
  router.delete('/users/:id', options.remove);
};

export default userRoutes;