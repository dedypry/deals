// Update with your config settings.

import { Knex } from 'knex';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: 'database.db',
    pool: {
      min: 2,
      max: 10,
    },
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
