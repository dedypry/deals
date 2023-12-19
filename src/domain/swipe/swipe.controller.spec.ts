import { Test, TestingModule } from '@nestjs/testing';
import { SwipeController } from './swipe.controller';
import { SwipeService } from './swipe.service';

describe('SwipeController', () => {
  let controller: SwipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwipeController],
      providers: [SwipeService],
    }).compile();

    controller = module.get<SwipeController>(SwipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
