import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCategoryController } from './projectCategory.controller';

describe('ProjectCategoryController', () => {
  let controller: ProjectCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCategoryController],
    }).compile();

    controller = module.get<ProjectCategoryController>(
      ProjectCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
