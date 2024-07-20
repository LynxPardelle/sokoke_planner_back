/* Types */
import { TRepository } from '@src/shared/types/repository.type';
import { TSearch } from '@src/shared/types/search.type';
import { TFeature } from './feature.type';
import { TProject } from './project.type';
import { TProjectCategory } from './projectCategory.type';
import { TProjectSubCategory } from './projectSubCategory.type';
import { TRequeriment } from './requeriment.type';
import { TStatus } from './status.type';
import { TTask } from './task.type';
/* DTOs */
import { CreateFeatureDTO } from '../DTOs/createFeature.dto';
import { CreateProjectDTO } from '../DTOs/createProject.dto';
import { CreateProjectCategoryDTO } from '../DTOs/createProjectCategory.dto';
import { CreateProjectSubCategoryDTO } from '../DTOs/createProjectSubCategory.dto';
import { CreateRequerimentsDTO } from '../DTOs/createRequeriment.dto';
import { CreateStatusDTO } from '../DTOs/createStatus.dto';
import { CreateTaskDTO } from '../DTOs/createTask.dto';
import { UpdateFeatureDTO } from '../DTOs/updateFeature.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';
import { UpdateProjectCategoryDTO } from '../DTOs/updateProjectCategory.dto';
import { UpdateProjectSubCategoryDTO } from '../DTOs/updateProjectSubCategory.dto';
import { UpdateRequerimentDTO } from '../DTOs/updateRequeriment.dto';
import { UpdateStatusDTO } from '../DTOs/updateStatus.dto';
import { UpdateTaskDTO } from '../DTOs/updateTask.dto';
export declare type TFeatureRepository = TRepository<
  CreateFeatureDTO,
  undefined,
  undefined,
  TSearch<TFeature>,
  UpdateFeatureDTO,
  undefined,
  undefined,
  TFeature
>;
export declare type TProjectRepository = TRepository<
  CreateProjectDTO,
  undefined,
  undefined,
  TSearch<TProject>,
  UpdateProjectDTO,
  undefined,
  undefined,
  TProject
>;
export declare type TProjectCategoryRepository = TRepository<
  CreateProjectCategoryDTO,
  undefined,
  undefined,
  TSearch<TProjectCategory>,
  UpdateProjectCategoryDTO,
  undefined,
  undefined,
  TProjectCategory
>;
export declare type TProjectSubCategoryRepository = TRepository<
  CreateProjectSubCategoryDTO,
  undefined,
  undefined,
  TSearch<TProjectSubCategory>,
  UpdateProjectSubCategoryDTO,
  undefined,
  undefined,
  TProjectSubCategory
>;
export declare type TRequerimentRepository = TRepository<
  CreateRequerimentsDTO,
  undefined,
  undefined,
  TSearch<TRequeriment>,
  UpdateRequerimentDTO,
  undefined,
  undefined,
  TRequeriment
>;
export declare type TStatusRepository = TRepository<
  CreateStatusDTO,
  undefined,
  undefined,
  TSearch<TStatus>,
  UpdateStatusDTO,
  undefined,
  undefined,
  TStatus
>;
export declare type TTaskRepository = TRepository<
  CreateTaskDTO,
  undefined,
  undefined,
  TSearch<TTask>,
  UpdateTaskDTO,
  undefined,
  undefined,
  TTask
>;
