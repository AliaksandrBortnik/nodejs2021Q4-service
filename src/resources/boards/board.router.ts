import {FastifyInstance, FastifyPluginAsync} from "fastify";
import options from './board.router-option';

/**
 * Handle board routes
 * @param router - Fastify's instance router
 */
export const boardRouter: FastifyPluginAsync = async (router: FastifyInstance) => {
  router.get('/boards', options.getAll);
  router.get('/boards/:id', options.getById);
  router.post('/boards', options.add);
  router.put('/boards/:id', options.update);
  router.delete('/boards/:id', options.remove);
};