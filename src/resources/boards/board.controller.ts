import BoardService from './board.service';
import { Board } from "./board.model";
import {FastifyReply, FastifyRequest} from "fastify";

type CustomFastifyRequest = FastifyRequest<{
  Params: {
    id: string
  },
  Body: Board
}>;

async function getAll(_: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const boards: Board[] = await BoardService.getAll();
  res.code(200).send(boards);
}

async function getById(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const board: Board | undefined = await BoardService.getById(req.params.id);

  if (!board) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  res.code(200).send(board);
}

async function add(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const board: Board = await BoardService.add(req.body);
  res.status(201).send(board);
}

async function update(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const boardExists = !!(await BoardService.getById(req.params.id));

  if (!boardExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  const board: Board = await BoardService.update(req.params.id, req.body);
  res.code(200).send(board);
}

async function remove(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const boardExists = !!(await BoardService.getById(req.params.id));

  if (!boardExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  await BoardService.remove(req.params.id);
  res.code(204);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};