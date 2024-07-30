import { Test, TestingModule } from '@nestjs/testing';
import { ProjectSubCategoryService } from './projectSubCategory.service';

describe('ProjectSubCategoryService', () => {
  let service: ProjectSubCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectSubCategoryService],
    }).compile();

    service = module.get<ProjectSubCategoryService>(ProjectSubCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
