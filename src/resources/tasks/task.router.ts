import {FastifyInstance, FastifyPluginAsync } from 'fastify';
import options from './task.router-option';

/**
 * Handle task routes
 * @param router - Fastify's instance router
 */
export const taskRouter: FastifyPluginAsync = async (router: FastifyInstance): Promise<void> => {
  router.get('/boards/:boardId/tasks', options.getAll);
  router.get('/boards/:boardId/tasks/:taskId', options.getById);
  router.post('/boards/:boardId/tasks', options.add);
  router.put('/boards/:boardId/tasks/:taskId', options.update);
  router.delete('/boards/:boardId/tasks/:taskId', options.remove);
};