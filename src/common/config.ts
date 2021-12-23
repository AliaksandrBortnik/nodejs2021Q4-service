import * as dotenv from 'dotenv';
import * as path from 'path';
import * as process from 'process';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config: Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};

export interface Config {
  PORT: string | undefined,
  NODE_ENV: string | undefined,
  LOG_LEVEL: string | undefined,
  MONGO_CONNECTION_STRING: string | undefined,
  JWT_SECRET_KEY: string | undefined,
  AUTH_MODE: boolean
}

export default config;