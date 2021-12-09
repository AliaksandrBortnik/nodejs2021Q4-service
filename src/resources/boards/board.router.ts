import {FastifyInstance, FastifyPluginAsync} from "fastify";
import options from './board.router-option';

const boardRoutes: FastifyPluginAsync = async (router: FastifyInstance) => {
  router.get('/boards', options.getAll);
  router.get('/boards/:id', options.getById);
  router.post('/boards', options.add);
  router.put('/boards/:id', options.update);
  router.delete('/boards/:id', options.remove);
}

export default boardRoutes;