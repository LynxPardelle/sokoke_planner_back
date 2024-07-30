import { Injectable } from '@nestjs/common';
/* Repositories */
import ProjectCategoryRepository from '../repositories/projectCategory.repository';
/* Types */
import { TProjectCategory } from '../types/projectCategory.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TProjectCategoryRepository } from '../types/repositoryPlanner.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateProjectCategoryDTO } from '../DTOs/createProjectCategory.dto';
import { UpdateProjectCategoryDTO } from '../DTOs/updateProjectCategory.dto';
/* Services */
import { LoggerService } from '@src/shared/services/logger.service';
@Injectable()
export class ProjectCategoryService implements TProjectCategoryRepository {
  constructor(
    private _projectCategoryRepository: ProjectCategoryRepository,
    private _loggerService: LoggerService,
  ) {}
  author(): { [key: string]: string } {
    return {
      author: 'Lynx Pardelle',
      site: 'https://lynxpardelle.com',
      github: 'https://github.com/LynxPardelle',
    };
  }
  /* Create */
  async create(
    data: CreateProjectCategoryDTO,
    args?: { projectId: string },
  ): Promise<TRepositoryResponse<TProjectCategory>> {
    this._loggerService.info(
      `Creating project category: ${JSON.stringify(data)}`,
      'ProjectCategoryService.create',
    );
    return await this._projectCategoryRepository.create(data, args);
  }
  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TProjectCategory>> {
    this._loggerService.info(
      `Reading project category: ${id}`,
      'ProjectCategoryService.read',
    );
    return await this._projectCategoryRepository.read(id);
  }
  async readAll(
    args?: TSearch<TProjectCategory>,
  ): Promise<TRepositoryResponse<TProjectCategory[]>> {
    this._loggerService.info(
      `Reading all project categories: ${JSON.stringify(args)}`,
      'ProjectCategoryService.readAll',
    );
    return await this._projectCategoryRepository.readAll(args);
  }
  /* Update */
  async update(
    data: UpdateProjectCategoryDTO,
  ): Promise<TRepositoryResponse<TProjectCategory>> {
    this._loggerService.info(
      `Updating project category: ${JSON.stringify(data)}`,
      'ProjectCategoryService.update',
    );
    return await this._projectCategoryRepository.update(data);
  }
  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TProjectCategory>> {
    this._loggerService.info(
      `Deleting project category: ${id}`,
      'ProjectCategoryService.delete',
    );
    return await this._projectCategoryRepository.delete(id);
  }
}
