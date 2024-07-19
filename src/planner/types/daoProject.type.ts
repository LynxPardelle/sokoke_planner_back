/* Types */
import { TDAO } from '@src/shared/types/dao.type';
import { TProject } from './project.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateProjectDTO } from '../DTOs/createProject.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';

export type TProjectDAO = TDAO<
  CreateProjectDTO,
  TSearch<TProject>,
  UpdateProjectDTO,
  TProject
>;
