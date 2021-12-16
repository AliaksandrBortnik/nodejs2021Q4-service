import {FastifyReply, FastifyRequest } from "fastify";
import UserService from "./user.service";
import User from "./user.model";

type CustomFastifyRequest = FastifyRequest<{
  Params: { id: string },
  Body: User
}>;

async function getAll(_: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const users = await UserService.getAll();
  res.code(200).send(users);
}

async function getById(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const user: User | undefined = await UserService.getById(req.params.id);

  if (!user) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  res.code(200).send(user);
}

async function add(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const user = await UserService.add(req.body);
  res.status(201).send(user);
}

async function update(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const userExists = !!(await UserService.getById(req.params.id));

  if (!userExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  const user: User = await UserService.update(req.params.id, req.body);
  res.code(200).send(user);
}

async function remove(req: CustomFastifyRequest, res: FastifyReply): Promise<void> {
  const userExists = !!(await UserService.getById(req.params.id));

  if (!userExists) {
    res.code(404).send({ message: 'Not Found' });
    return;
  }

  await UserService.remove(req.params.id);
  res.code(204);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};