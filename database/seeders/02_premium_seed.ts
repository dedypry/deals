import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const tableName = 'premium';
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert({
    name: 'UNLOCK',
    price: 100_000,
  });
}
