import { Module } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { PremiumController } from './premium.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { PremiumModel } from '../../models/Premium.model';
import { PremiumUserModel } from '../../models/PremiumUser.model';
import { UserModel } from '../../models/User.model';

@Module({
  imports: [
    ObjectionModule.forFeature([PremiumModel, PremiumUserModel, UserModel]),
  ],
  controllers: [PremiumController],
  providers: [PremiumService],
})
export class PremiumModule {}
