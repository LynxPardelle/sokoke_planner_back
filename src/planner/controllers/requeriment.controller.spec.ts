import { Test, TestingModule } from '@nestjs/testing';
import { RequerimentController } from './requeriment.controller';

describe('RequerimentController', () => {
  let controller: RequerimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequerimentController],
    }).compile();

    controller = module.get<RequerimentController>(RequerimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
