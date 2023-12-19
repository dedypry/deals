import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomGender() {
  return Math.random() < 0.5 ? 'MALE' : 'FEMALE';
}

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  for (let index = 0; index < 100; index++) {
    await knex('users').insert({
      name: faker.person.fullName(),
      age: getRandomInt(20, 50),
      gender: getRandomGender(),
      bio: faker.person.bio(),
      location: faker.person.jobArea(),
      profile_picture_url: faker.internet.avatar(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('123456', process.env.BCRYPT_SALT),
      is_premium: faker.datatype.boolean(),
    });
  }
}
