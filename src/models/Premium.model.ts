import { Model, Relation, Table } from 'nestjs-objection/dist';
import { BaseModel } from './Base.model';
import { UserModel } from './User.model';

@Table({ tableName: 'premium' })
export class PremiumModel extends BaseModel {
  name: string;
  price: number;
  is_active: boolean;

  @Relation({
    modelClass: UserModel,
    relation: Model.HasManyRelation,
    join: {
      from: 'users.id',
      through: {
        from: 'premium_user.user_id',
        to: 'premium_user.premium_id',
      },
      to: 'premium.id',
    },
  })
  swipes: UserModel[];
}
