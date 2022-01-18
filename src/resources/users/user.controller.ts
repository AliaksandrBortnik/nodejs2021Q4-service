import { FastifyReply } from "fastify";
import { UserService } from "./user.service";
import { User } from "../../entity/user.model";
import {UserFastifyRequest} from "./user.request";
import {StatusCodes} from "http-status-codes";

/**
 * Class to handle all User's requests
 */
export class UserController {
  req: UserFastifyRequest;
  res: FastifyReply;
  userService: UserService;

  /**
   * Constructor of UserController class
   * @param req - request object
   * @param res - response object
   */
  constructor(req: UserFastifyRequest, res: FastifyReply) {
    this.req = req;
    this.res = res;
    this.userService = new UserService();
  }

  /**
   * Get all users and send users as a response with 200 status.
   */
  async getAll(): Promise<void> {
    const users: User[] = await this.userService.getAll();
    this.res.code(StatusCodes.OK).send(users);
  }

  /**
   * Get a user by ID and send the user as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  async getById(): Promise<void> {
    const userId: string = this.req.params.id;
    const user: User | undefined = await this.userService.getById(userId);

    if (!user) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    this.res.code(StatusCodes.OK).send(user);
  }

  /**
   * Add a user and send the created user as a response with 201 status.
   */
  async add(): Promise<void> {
    const user: User = await this.userService.addOrUpdate(this.req.body);
    this.res.status(StatusCodes.CREATED).send(user);
  }

  /**
   * Update a user and send the updated user as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  async update(): Promise<void> {
    const userId: string = this.req.params.id;
    const userExists = !!(await this.userService.getById(userId));

    if (!userExists) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    if (userId !== this.req.body.id && this.req.body.id !== null) {
      this.res.code(StatusCodes.BAD_REQUEST).send({ message: 'Mismatch of id' });
      return;
    }

    const user: User = await this.userService.addOrUpdate(this.req.body);
    this.res.code(StatusCodes.OK).send(user);
  }

  /**
   * Remove a user and send a response with 204 status if found.
   * Otherwise, send 404 response.
   */
  async remove(): Promise<void> {
    const userId: string = this.req.params.id;
    const userExists = !!(await this.userService.getById(userId));

    if (!userExists) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    await this.userService.remove(userId);
    this.res.code(StatusCodes.NO_CONTENT);
  }
}