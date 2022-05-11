import * as dotenv from 'dotenv';
import * as path from 'path';
import * as process from 'process';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_SALT_ROUNDS: process.env.AUTH_SALT_ROUNDS,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  USE_FASTIFY: process.env.USE_FASTIFY === 'true'
};