import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/* Modules */
import { SharedModule } from '@src/shared/shared.module';
/* Controllers */
import { FeatureController } from './controllers/feature.controller';
import { ProjectController } from './controllers/project.controller';
import { ProjectCategoryController } from './controllers/projectCategory.controller';
import { ProjectSubCategoryController } from './controllers/projectSubCategory.controller';
import { RequerimentController } from './controllers/requeriment.controller';
import { StatusController } from './controllers/status.controller';
import { TaskController } from './controllers/task.controller';
/* Services */
import { FeatureService } from './services/feature.service';
import { ProjectService } from './services/project.service';
import { ProjectCategoryService } from './services/projectCategory.service';
import { ProjectSubCategoryService } from './services/projectSubCategory.service';
import { RequerimentService } from './services/requeriment.service';
import { StatusService } from './services/status.service';
import { TaskService } from './services/task.service';
/* Repositories */
import FeatureRepository from './repositories/feature.repository';
import ProjectRepository from './repositories/project.repository';
import ProjectCategoryRepository from './repositories/projectCategory.repository';
import ProjectSubCategoryRepository from './repositories/projectSubCategory.repository';
import RequerimentRepository from './repositories/requeriment.repository';
import StatusRepository from './repositories/status.repository';
import TaskRepository from './repositories/task.repository';
/* Factories */
import { FeatureDaoFactory } from './DAOs/feature.factory';
import { ProjectDaoFactory } from './DAOs/project.factory';
import { ProjectCategoryDaoFactory } from './DAOs/projectCategory.factory';
import { ProjectSubCategoryDaoFactory } from './DAOs/projectSubCategory.factory';
import { StatusDaoFactory } from './DAOs/status.factory';
import { RequerimentDaoFactory } from './DAOs/requeriment.factory';
import { TaskDaoFactory } from './DAOs/task.factory';
/* Schemas */
import { plannerModuleSchemaFactory } from './schemas/planner.module.schema.factory';
/* DAOs */
import { MongoDBFeatureDAO } from './DAOs/mongo/mongoFeature.dao';
import { MongoDBProjectDAO } from './DAOs/mongo/mongoProject.dao';
import { MongoDBProjectCategoryDAO } from './DAOs/mongo/mongoProjectCategory.dao';
import { MongoDBProjectSubCategoryDAO } from './DAOs/mongo/mongoProjectSubCategory.dao';
import { MongoDBRequerimentDAO } from './DAOs/mongo/mongoRequeriment.dao';
import { MongoDBStatusDAO } from './DAOs/mongo/mongoStatus.dao';
import { MongoDBTaskDAO } from './DAOs/mongo/mongoTask.dao';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(plannerModuleSchemaFactory),
    SharedModule,
  ],
  controllers: [
    FeatureController,
    ProjectController,
    ProjectCategoryController,
    ProjectSubCategoryController,
    RequerimentController,
    StatusController,
    TaskController,
  ],
  providers: [
    /* Services */
    FeatureService,
    ProjectService,
    ProjectCategoryService,
    ProjectSubCategoryService,
    RequerimentService,
    StatusService,
    TaskService,
    /* Repositories */
    FeatureRepository,
    ProjectRepository,
    ProjectCategoryRepository,
    ProjectSubCategoryRepository,
    RequerimentRepository,
    StatusRepository,
    TaskRepository,
    /* Factories */
    FeatureDaoFactory,
    ProjectDaoFactory,
    ProjectCategoryDaoFactory,
    ProjectSubCategoryDaoFactory,
    StatusDaoFactory,
    RequerimentDaoFactory,
    TaskDaoFactory,
    /* DAOs */
    MongoDBFeatureDAO,
    MongoDBProjectDAO,
    MongoDBProjectCategoryDAO,
    MongoDBProjectSubCategoryDAO,
    MongoDBRequerimentDAO,
    MongoDBStatusDAO,
    MongoDBTaskDAO,
  ],
  exports: [
    /* Services */
    FeatureService,
    ProjectService,
    ProjectCategoryService,
    ProjectSubCategoryService,
    RequerimentService,
    StatusService,
    TaskService,
    /* Repositories */
    FeatureRepository,
    ProjectRepository,
    ProjectCategoryRepository,
    ProjectSubCategoryRepository,
    RequerimentRepository,
    StatusRepository,
    TaskRepository,
    /* Factories */
    FeatureDaoFactory,
    ProjectDaoFactory,
    ProjectCategoryDaoFactory,
    ProjectSubCategoryDaoFactory,
    StatusDaoFactory,
    RequerimentDaoFactory,
    TaskDaoFactory,
    /* MongoDB */
    MongooseModule,
  ],
})
export class PlannerModule {}
