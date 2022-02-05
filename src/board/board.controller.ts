import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res} from "@nestjs/common";
import {Response} from 'express';
import {BoardService} from "./board.service";
import {BoardEntity} from "./entities/board.entity";
import {BoardDto} from "./dto/board.dto";
import {CreateBoardDto} from "./dto/create-board.dto";

@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  /**
   * Get all boards and send boards as a response with 200 status.
   */
  @Get()
  async getAll(): Promise<BoardDto[]> {
    return this.boardService.getAll();
  }

  /**
   * Get a board by ID and send the board as a response with 200 status if found.
   * Otherwise, send 404 response
   */
  @Get(':id')
  async getById(
    @Param('id') boardId: string,
    @Res() res: Response
  ): Promise<BoardDto | undefined> {
    const board: BoardDto | undefined = await this.boardService.getById(boardId);

    if (!board) {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    res.status(HttpStatus.OK).send(board);
  }

  /**
   * Add a board and send the created board as a response with 201 status.
   */
  @Post()
  async add(@Body() boardDto: CreateBoardDto): Promise<BoardDto> {
    return this.boardService.addOrUpdate(boardDto);
  }

  /**
   * Update a board and send the updated board as a response with 200 status if found.
   * Otherwise, send 404 response.
   */
  @Put(':id')
  async update(
    @Param('id') boardId: string,
    @Body() boardDto: BoardDto,
    @Res() res: Response
  ): Promise<BoardEntity | undefined> {
    const boardExists = !!(await this.boardService.getById(boardId));

    if (!boardExists) {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Not Found' });
      return;
    }

    if (boardId !== boardDto.id && boardDto.id !== null) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'Mismatch of boardId' });
      return;
    }

    const board: BoardDto = await this.boardService.addOrUpdate(boardDto);
    res.status(HttpStatus.OK).send(board);
  }

  /**
   * Remove a board and send a response with 204 status if found.
   * Otherwise, send 404 response.
   */
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