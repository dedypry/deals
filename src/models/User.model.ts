import { Model, Relation, Table } from 'nestjs-objection/dist';
import { BaseModel } from './Base.model';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel {
  name: string;
  age: string;
  gender: string;
  bio: string;
  location: string;
  profile_picture_url: string;
  email: string;
  password: string;
  is_premium: boolean;

  @Relation({
    modelClass: UserModel,
    relation: Model.HasManyRelation,
    join: {
      from: 'users.id',
      through: {
        from: 'swipe.user_id',
        to: 'swipe.user_target_id',
      },
      to: 'users.id',
    },
  })
  swipes: UserModel[];
}
