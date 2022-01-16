import {config} from './common/config';
import {ConnectionOptions} from "typeorm";

export const dbConnectionOptions: ConnectionOptions = {
  type: "postgres",
  host: "rss-db", // "localhost"
  port: +config.POSTGRES_PORT!,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  synchronize: true,
  // migrations: ["src/migration/**/*.ts"],
  // migrationsRun: true // or use the CLI command instead
};