import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCategoryService } from './projectCategory.service';

describe('ProjectCategoryService', () => {
  let service: ProjectCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectCategoryService],
    }).compile();

    service = module.get<ProjectCategoryService>(ProjectCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
