import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config: IConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};

interface IConfig {
  PORT: string | undefined,
  NODE_ENV: string | undefined,
  MONGO_CONNECTION_STRING: string | undefined,
  JWT_SECRET_KEY: string | undefined,
  AUTH_MODE: boolean
}

export default config;