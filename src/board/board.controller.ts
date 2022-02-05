import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res} from "@nestjs/common";
import {Response} from 'express';
import {BoardService} from "./board.service";
import {BoardEntity} from "./entities/board.entity";

@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  /**
   * Get all boards and send boards as a response with 200 status.
   */
  @Get()
  async getAll(): Promise<BoardEntity[]> {
    const boards: BoardEntity[] = await this.boardService.getAll();
    return boards;
  }

  /**
   * Get a board by ID and send the board as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  // TODO: validate id - uuid
  @Get(':id')
  async getById(
    @Param('id') boardId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<BoardEntity | undefined> {
    const board: BoardEntity | undefined = await this.boardService.getById(boardId);

    if (!board) {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    return board;
  }

  /**
   * Add a board and send the created board as a response with 201 status.
   */
  // TODO: all fields required (title, columns) except id
  @Post()
  async add(@Body() boardEntity: BoardEntity): Promise<BoardEntity> {
    const board: BoardEntity = await this.boardService.addOrUpdate(boardEntity);
    return board;
  }

  /**
   * Update a board and send the updated board as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  // TODO: all fields required (title, columns)
  // TODO: id is uuid
  @Put(':id')
  async update(
    @Param('id') boardId: string,
    @Body() boardEntity: BoardEntity,
    @Res() res: Response
  ): Promise<BoardEntity | undefined> {
    const boardExists = !!(await this.boardService.getById(boardId));

    if (!boardExists) {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    if (boardId !== boardEntity.id && boardEntity.id !== null) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'Mismatch of boardId' });
      return;
    }

    const board: BoardEntity = await this.boardService.addOrUpdate(boardEntity);
    return board;
  }

  /**
   * Remove a board and send a response with 204 status if found.
   * Otherwise, send 404 response.
   */
  // TODO: id is uuid
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') boardId: string,
    @Res() res: Response
  ): Promise<void> {
    const boardExists = !!(await this.boardService.getById(boardId));

    if (!boardExists) {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    await this.boardService.remove(boardId);
  }
}