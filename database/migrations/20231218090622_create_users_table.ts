import type { Knex } from 'knex';

const tableName = 'users';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.bigIncrements('id');
    table.string('name');
    table.decimal('age', 17, 2);
    table.string('gender');
    table.string('bio');
    table.text('location');
    table.string('profile_picture_url');
    table.string('email');
    table.string('password');
    table.boolean('is_premium').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
