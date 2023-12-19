import { Module } from '@nestjs/common';
import { SwipeService } from './swipe.service';
import { SwipeController } from './swipe.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { SwipeModel } from '../../models/Swipe.model';
import { UserModel } from '../../models/User.model';

@Module({
  imports: [ObjectionModule.forFeature([SwipeModel, UserModel])],
  controllers: [SwipeController],
  providers: [SwipeService],
})
export class SwipeModule {}
