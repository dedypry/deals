import type { Knex } from 'knex';

const tableName = 'premium_user';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.bigIncrements('id');
    table.bigInteger('premium_id').references('id').inTable('premium');
    table.bigInteger('user_id').references('id').inTable('users');
    table.dateTime('expiry_date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
