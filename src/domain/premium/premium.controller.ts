import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { InsertPremiumDto } from './dto/insert-premium.dto';
import { Request } from 'express';
import { PremiumModel } from '../../models/Premium.model';
import { AuthGuard } from '../../guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('premium')
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) {}

  @Get()
  list(): Promise<PremiumModel[]> {
    return this.premiumService.list();
  }

  @Post()
  create(@Body() body: InsertPremiumDto, @Req() req: Request): Promise<string> {
    return this.premiumService.create(body, req['user']);
  }
}
