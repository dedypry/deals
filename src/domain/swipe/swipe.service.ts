import { Injectable } from '@nestjs/common';
import { AnyQueryBuilder, InjectModel } from 'nestjs-objection/dist';
import { SwipeModel } from '../../models/Swipe.model';
import { BodySwipeDto } from './dto/body-swipe.dto';
import { QueryDtoDefault } from '../../utils/query-default.dto';
import { UserModel } from '../../models/User.model';
import { raw } from 'objection';
import InvalidData from 'src/exceptions/InvalidData.exception';

@Injectable()
export class SwipeService {
  constructor(
    @InjectModel(SwipeModel) private readonly swipeModel: typeof SwipeModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async list(query: QueryDtoDefault) {
    return await this.userModel
      .query()
      .select(
        'users.id',
        'name',
        'age',
        'gender',
        'bio',
        'location',
        'profile_picture_url',
        'email',
        'is_premium',
        'created_at',
        'updated_at',
        raw('coalesce(sw.likes,0)').as('likes'),
        raw('coalesce(sw.pass,0)').as('pass'),
      )
      .leftJoin(
        this.swipeModel
          .query()
          .select(
            'target_user_id',
            raw(`SUM(case when type = 'LIKE' then 1 else 0 end)`).as('likes'),
            raw(`SUM(case when type = 'PASS' then 1 else 0 end)`).as('pass'),
          )
          .groupBy('target_user_id')
          .as('sw'),
        'sw.target_user_id',
        'users.id',
      )
      .leftJoin(
        this.swipeModel
          .query()
          .select('target_user_id', raw('json_agg(user_id)').as('users'))
          .whereRaw("date(updated_at) = date('now')")
          .groupBy('target_user_id')
          .as('swt'),
        'swt.target_user_id',
        'users.id',
      )
      .leftJoin(
        raw('json_each(swt.users)').as('json_each_users'),
        'json_each_users.value',
        'users.id',
      )
      .whereNull('json_each_users.value')
      .where((builder: AnyQueryBuilder) => {
        if (query.search) {
          builder.where('name', 'like', `%${query.search}%`);
        }
      })
      .orderByRaw('random()')
      .page(query.page, query.limit);
  }

  async insert(body: BodySwipeDto, user: UserModel) {
    // update data user
    user = await this.userModel.query().findById(user.id);
    const { total }: any = await this.swipeModel
      .query()
      .select(raw('count(*)').as('total'))
      .where('user_id', user.id)
      .andWhereRaw("date(updated_at) = date('now')")
      .first();

    if (!user.is_premium && total > 10) {
      throw new InvalidData('Quote is empty, please try again tomorrow');
    }

    const swipe = await this.swipeModel.query().findOne({
      user_id: user.id,
      target_user_id: body.target_user_id,
    });

    if (swipe && swipe.type === body.type) {
      await this.swipeModel.query().deleteById(swipe.id);
      return swipe;
    }

    const dataInsert = {
      id: swipe?.id,
      user_id: user.id,
      target_user_id: body.target_user_id,
      type: body.type,
    };

    return await this.swipeModel.query().upsertGraph(dataInsert);
  }
}
