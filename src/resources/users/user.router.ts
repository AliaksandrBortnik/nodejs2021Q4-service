import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { userRouterOption as options } from './user.router-option';

/**
 * Handle user routes
 * @param router - Fastify's instance router
 */
export const userRouter: FastifyPluginAsync = async (router: FastifyInstance): Promise<void> => {
  router.get('/users', options.getAll);
  router.get('/users/:id', options.getById);
  router.post('/users', options.add);
  router.put('/users/:id', options.update);
  router.delete('/users/:id', options.remove);
};