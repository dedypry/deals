// Update with your config settings.

import { Knex } from 'knex';
import 'dotenv/config';
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeders',
  },
};

export default knexConfig;
