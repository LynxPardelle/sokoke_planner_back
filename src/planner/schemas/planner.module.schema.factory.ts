import { AsyncModelFactory } from '@nestjs/mongoose';
import { featureSchemaFactory } from './feature.schema.factory';
import { projectSchemaFactory } from './project.schema.factory';
import { projectCategorySchemaFactory } from './projectCategory.schema.factory';
import { projectSubCategorySchemaFactory } from './projectSubCategory.schema.factory';
import { requerimentSchemaFactory } from './requeriment.schema.factory';
import { statusSchemaFactory } from './status.schema.factory';
import { taskSchemaFactory } from './task.schema.factory';

export const plannerModuleSchemaFactory: AsyncModelFactory[] = [
  featureSchemaFactory,
  projectSchemaFactory,
  projectCategorySchemaFactory,
  projectSubCategorySchemaFactory,
  requerimentSchemaFactory,
  statusSchemaFactory,
  taskSchemaFactory,
];
