import {Connection, createConnection} from 'typeorm';

export const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (): Promise<Connection> => await createConnection()
};