/* Types */
import { TRepository } from '@src/shared/types/repository.type';
import { TProject } from './project.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateProjectDTO } from '../DTOs/createProject.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';
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
