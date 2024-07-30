import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/* Modules */
import { SharedModule } from '@src/shared/shared.module';
/* Controllers */
import { PlannerController } from './controllers/planner/planner.controller';
/* Services */
import { PlannerService } from './services/planner/planner.service';
/* Repositories */
/* Factories */
import { FeatureDaoFactory } from './DAOs/feature.factory';
import { ProjectDaoFactory } from './DAOs/project.factory';
import { ProjectCategoryDaoFactory } from './DAOs/projectCategory.factory';
import { ProjectSubCategoryDaoFactory } from './DAOs/projectSubCategory.factory';
import { StatusDaoFactory } from './DAOs/status.factory';
import { RequerimentDaoFactory } from './DAOs/requeriment.factory';
/* Schemas */
import { plannerModuleSchemaFactory } from './schemas/planner.module.schema.factory';
/* DAOs */
@Module({
  imports: [
    MongooseModule.forFeatureAsync(plannerModuleSchemaFactory),
    SharedModule,
  ],
  controllers: [PlannerController],
  providers: [
    /* Services */
    PlannerService,
    /* Repositories */
    /* Factories */
    /* DAOs */
  ],
  exports: [
    /* Services */
    /* Repositories */
    /* Factories */
    /* MongoDB */
    MongooseModule,
  ],
})
export class PlannerModule {}
