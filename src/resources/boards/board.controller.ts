import {BoardService} from './board.service';
import {Board} from "../../entity/board.model";
import {FastifyReply} from "fastify";
import {BoardFastifyRequest} from "./board.request";
import {StatusCodes} from "http-status-codes";

/**
 * Class to handle all Board's requests
 */
export class BoardController {
  req: BoardFastifyRequest;
  res: FastifyReply;
  boardService: BoardService;

  /**
   * Constructor of BoardController class
   * @param req - request object
   * @param res - response object
   */
  constructor(req: BoardFastifyRequest, res: FastifyReply) {
    this.req = req;
    this.res = res;
    this.boardService = new BoardService();
  }

  /**
   * Get all boards and send boards as a response with 200 status.
   */
  async getAll(): Promise<void> {
    const boards: Board[] = await this.boardService.getAll();
    this.res.code(StatusCodes.OK).send(boards);
  }

  /**
   * Get a board by ID and send the board as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  async getById(): Promise<void> {
    const boardId: string = this.req.params.id;
    const board: Board | undefined = await this.boardService.getById(boardId);

    if (!board) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    this.res.code(StatusCodes.OK).send(board);
  }

  /**
   * Add a board and send the created board as a response with 201 status.
   */
  async add(): Promise<void> {
    const board: Board = await this.boardService.addOrUpdate(this.req.body);
    this.res.status(StatusCodes.CREATED).send(board);
  }

  /**
   * Update a board and send the updated board as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  async update(): Promise<void> {
    const boardId: string = this.req.params.id;
    const boardExists = !!(await this.boardService.getById(boardId));

    if (!boardExists) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    if (boardId !== this.req.body.id && this.req.body.id !== null) {
      this.res.code(StatusCodes.BAD_REQUEST).send({ message: 'Mismatch of boardId' });
      return;
    }

    const board: Board = await this.boardService.addOrUpdate(this.req.body);
    this.res.code(StatusCodes.OK).send(board);
  }

  /**
   * Remove a board and send a response with 204 status if found.
   * Otherwise, send 404 response.
   */
  async remove(): Promise<void> {
    const boardId: string = this.req.params.id;
    const boardExists = !!(await this.boardService.getById(boardId));

    if (!boardExists) {
      this.res.code(StatusCodes.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    await this.boardService.remove(boardId);
    this.res.code(StatusCodes.NO_CONTENT);
  }
}