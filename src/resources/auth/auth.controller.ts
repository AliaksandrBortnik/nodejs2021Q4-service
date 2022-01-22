import {FastifyReply} from 'fastify';
import {StatusCodes} from "http-status-codes";
import {AuthService} from "./auth.service";
import {AuthFastifyRequest} from "./auth.request";
import app from "../../app";

/**
 * Class to handle all Auth's requests
 */
export class AuthController {
  req: AuthFastifyRequest;
  res: FastifyReply;
  authService: AuthService;

  /**
   * Constructor of AuthController class
   * @param req - request object
   * @param res - response object
   */
  constructor(req: AuthFastifyRequest, res: FastifyReply) {
    this.req = req;
    this.res = res;
    this.authService = new AuthService();
  }

  async login(): Promise<void> {
    const { login, password } = this.req.body;
    const userId: string | undefined = await this.authService.checkUser(login, password);

    if (!userId) {
      this.res.status(StatusCodes.FORBIDDEN).send();
      return;
    }

    const token: string = app.jwt.sign({ login, userId });
    this.res.send({ token })
  }
}