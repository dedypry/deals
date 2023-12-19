import { Module } from '@nestjs/common';
import knexConfig from 'knexfile';
import { Model, ObjectionModule } from 'nestjs-objection';

@Module({
  imports: [
    ObjectionModule.forRoot({
      Model,
      config: knexConfig,
    }),
  ],
})
export class DatabaseConfig {}
