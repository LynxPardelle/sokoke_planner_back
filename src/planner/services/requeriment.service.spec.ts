import { Test, TestingModule } from '@nestjs/testing';
import { RequerimentService } from './requeriment.service';

describe('RequerimentService', () => {
  let service: RequerimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequerimentService],
    }).compile();

    service = module.get<RequerimentService>(RequerimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
