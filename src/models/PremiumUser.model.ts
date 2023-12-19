import { Table } from 'nestjs-objection/dist';
import { BaseModel } from './Base.model';

@Table({ tableName: 'premium_user' })
export class PremiumUserModel extends BaseModel {
  premium_id: number;
  user_id: number;
  expiry_date: string;
}
