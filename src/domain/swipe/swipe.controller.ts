import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SwipeService } from './swipe.service';
import { AuthGuard } from '../../guard/auth.guard';
import { BodySwipeDto } from './dto/body-swipe.dto';
import { Request } from 'express';
import { QueryDtoDefault } from 'src/utils/query-default.dto';

@UseGuards(AuthGuard)
@Controller('swipe')
export class SwipeController {
  constructor(private readonly swipeService: SwipeService) {}

  @Get()
  list(@Query() query: QueryDtoDefault) {
    return this.swipeService.list(query);
  }

  @Post()
  insert(@Body() body: BodySwipeDto, @Req() req: Request) {
    return this.swipeService.insert(body, req['user']);
  }
}
