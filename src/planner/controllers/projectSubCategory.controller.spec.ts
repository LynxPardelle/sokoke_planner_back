import { Test, TestingModule } from '@nestjs/testing';
import { ProjectSubCategoryController } from './projectSubCategory.controller';

describe('ProjectSubCategoryController', () => {
  let controller: ProjectSubCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectSubCategoryController],
    }).compile();

    controller = module.get<ProjectSubCategoryController>(
      ProjectSubCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
