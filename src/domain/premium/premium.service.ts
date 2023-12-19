import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { PremiumModel } from '../../models/Premium.model';
import { InsertPremiumDto } from './dto/insert-premium.dto';
import DataNotFound from 'src/exceptions/DataNotFound.exception';
import { UserModel } from 'src/models/User.model';
import { PremiumUserModel } from '../../models/PremiumUser.model';
import * as moment from 'moment';

@Injectable()
export class PremiumService {
  constructor(
    @InjectModel(PremiumModel)
    private readonly premiumModel: typeof PremiumModel,
    @InjectModel(PremiumUserModel)
    private readonly premiumUserModel: typeof PremiumUserModel,
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async list(): Promise<PremiumModel[]> {
    return await this.premiumModel.query();
  }

  async create(body: InsertPremiumDto, user: UserModel): Promise<string> {
    return await this.premiumUserModel.transaction(async (trx) => {
      // cek premium available
      const premium = await this.premiumModel
        .query(trx)
        .findById(body.premium_id);
      if (!premium && premium.is_active) {
        throw new DataNotFound('package not active');
      }

      const dataInsert = {
        id: null,
        premium_id: premium.id,
        user_id: user.id,
        expiry_date: moment().add('1', 'month').toISOString(),
      };

      const userPremium = await this.premiumUserModel.query(trx).findOne({
        premium_id: premium.id,
        user_id: user.id,
      });

      if (userPremium) {
        dataInsert.id = userPremium.id;
      }

      await this.premiumUserModel.query(trx).upsertGraph(dataInsert);
      await this.userModel.query(trx).findById(user.id).patch({
        is_premium: true,
      });
      return 'premium is actived';
    });
  }
}
