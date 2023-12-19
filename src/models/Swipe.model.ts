import { Table } from 'nestjs-objection/dist';
import { BaseModel } from './Base.model';
import { SwipeType } from 'src/utils/enums';

@Table({ tableName: 'swipes', softDelete: true })
export class SwipeModel extends BaseModel {
  user_id: number;
  target_user_id: number;
  type: SwipeType;
}
