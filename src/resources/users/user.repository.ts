import { v4 as uuidv4 } from 'uuid';
import store from '../../store';
import User from "./user.model";

async function getAll(): Promise<User[]> {
  return store.users;
}

async function getById(id: string): Promise<User | undefined> {
  return store.users.find(u => u.id === id);
}

async function add(user: User): Promise<User> {
  const entity: User = {...user, id: uuidv4()};
  store.users.push(entity);
  return entity;
}

async function update(id: string, user: User): Promise<User> {
  const index: number = store.users.findIndex(u => u.id === id);
  store.users[index] = {...user, id};
  return store.users[index];
}

async function remove(id: string): Promise<void> {
  store.users = store.users.filter(u => u.id !== id);
}

export default {
  getAll,
  getById,
  add,
  update,
  remove
};