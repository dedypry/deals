import type { Knex } from 'knex';

const tableName = 'swipes';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.bigIncrements('id');
    table.bigInteger('user_id').references('id').inTable('users');
    table.bigInteger('target_user_id').references('id').inTable('users');
    table.enu('type', ['LIKE', 'PASS'], {
      useNative: true,
      enumName: 'SwipeType',
    });
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
