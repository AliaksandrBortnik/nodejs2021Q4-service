import { createConnection } from 'typeorm';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => await createConnection()
};