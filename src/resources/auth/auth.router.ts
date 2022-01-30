import {FastifyInstance, FastifyPluginAsync, FastifyReply} from "fastify";
import {AuthController} from "./auth.controller";
import {AuthFastifyRequest} from "./auth.request";

/**
 * Handle auth routes
 * @param router - Fastify's instance router
 */
export const authRouter: FastifyPluginAsync = async (router: FastifyInstance): Promise<void> => {
  router.post('/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['login', 'password'],
          properties: {
            login: { type: 'string' },
            password: { type: 'string' }
          }
        }
      }
    },
    (req: AuthFastifyRequest, res: FastifyReply): Promise<void> =>
      new AuthController(req, res).login()
  );
};