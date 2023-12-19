import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domain/auth/auth.module';
import { DatabaseConfig } from './configs/database.config';
import { SwipeModule } from './domain/swipe/swipe.module';
import { PremiumModule } from './domain/premium/premium.module';

@Module({
  imports: [DatabaseConfig, AuthModule, SwipeModule, PremiumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
