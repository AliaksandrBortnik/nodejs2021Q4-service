import { v4 as uuidv4 } from 'uuid';
import {store} from '../../store';
import { User } from "./user.model";

/**
 * User's repository to work with DB
 */
export class UserRepository {
  /**
   * Get all users from DB
   * @returns Returns promise of all existing users
   */
  async getAll(): Promise<User[]> {
    return store.users;
  }

  /**
   * Get user by id from DB
   * @param id - User's id
   * @returns Returns promise of a user if found
   */
  async getById(id: string): Promise<User | undefined> {
    return store.users.find(u => u.id === id);
  }

  /**
   * Add a new user to DB
   * @param user - User payload
   * @returns Returns promise of a new user
   */
  async add(user: User): Promise<User> {
    const entity: User = {...user, id: uuidv4()};
    store.users.push(entity);
    return entity;
  }

  /**
   * Update the user in DB
   * @param id - User's id
   * @param user - User's payload
   * @returns Returns promise of updated user
   */
  async update(id: string, user: User): Promise<User> {
    const index: number = store.users.findIndex(u => u.id === id);
    store.users[index] = {...user, id};
    return store.users[index];
  }

  /**
   * Removes the user by id from DB
   * @param id - User's id
   */
  async remove(id: string): Promise<void> {
    store.users = store.users.filter(u => u.id !== id);
  }
}