import { Injectable } from '@nestjs/common';
/* Repositories */
import ProjectSubCategoryRepository from '../repositories/projectSubCategory.repository';
/* Types */
import { TProjectSubCategory } from '../types/projectSubCategory.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TProjectSubCategoryRepository } from '../types/repositoryPlanner.type';
import { TSearch } from '@src/shared/types/search.type';
import { TProjectCategory } from '../types/projectCategory.type';
/* DTOs */
import { CreateProjectSubCategoryDTO } from '../DTOs/createProjectSubCategory.dto';
import { UpdateProjectSubCategoryDTO } from '../DTOs/updateProjectSubCategory.dto';
import { UpdateProjectCategoryDTO } from '../DTOs/updateProjectCategory.dto';
/* Services */
import { LoggerService } from '@src/shared/services/logger.service';
import { ProjectCategoryService } from './projectCategory.service';
@Injectable()
export class ProjectSubCategoryService
  implements TProjectSubCategoryRepository
{
  constructor(
    private _projectSubCategoryRepository: ProjectSubCategoryRepository,
    private _loggerService: LoggerService,
    private _projectCategoryService: ProjectCategoryService,
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
    data: CreateProjectSubCategoryDTO,
    args: { projectCategoryId: string },
  ): Promise<TRepositoryResponse<TProjectSubCategory>> {
    this._loggerService.info(
      `Creating project subcategory: ${JSON.stringify(data)}`,
      'ProjectSubCategoryService.create',
    );
    if (!args.projectCategoryId)
      throw new Error('Project category ID is required');
    const projectCategory: TRepositoryResponse<TProjectCategory> =
      await this._projectCategoryService.read(args.projectCategoryId);
    if (projectCategory.status !== 'success')
      throw new Error('Project category not found');
    this._loggerService.info(
      `Project category found: ${JSON.stringify(projectCategory.data)}`,
      'ProjectSubCategoryService.create',
    );
    const newProjectSubCategory =
      await this._projectSubCategoryRepository.create(data);
    this._loggerService.info(
      `Project subcategory created: ${JSON.stringify(newProjectSubCategory)}`,
      'ProjectSubCategoryService.create',
    );
    if (newProjectSubCategory.status === 'error')
      throw new Error('Error creating project subcategory');
    projectCategory.data.subCategories.push(newProjectSubCategory.data._id);
    const updatedProjectCategory = await this._projectCategoryService.update(
      projectCategory.data as UpdateProjectCategoryDTO,
    );
    this._loggerService.info(
      `Project category updated: ${JSON.stringify(updatedProjectCategory)}`,
      'ProjectSubCategoryService.create',
    );
    return newProjectSubCategory;
  }
  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TProjectSubCategory>> {
    this._loggerService.info(
      `Reading project subcategory: ${id}`,
      'ProjectSubCategoryService.read',
    );
    return this._projectSubCategoryRepository.read(id);
  }
  async readAll(
    args?: TSearch<TProjectSubCategory>,
  ): Promise<TRepositoryResponse<TProjectSubCategory[]>> {
    this._loggerService.info(
      `Reading all project subcategories: ${JSON.stringify(args)}`,
      'ProjectSubCategoryService.readAll',
    );
    return this._projectSubCategoryRepository.readAll(args);
  }
  /* Update */
  async update(
    data: UpdateProjectSubCategoryDTO,
  ): Promise<TRepositoryResponse<TProjectSubCategory>> {
    this._loggerService.info(
      `Updating project subcategory: ${JSON.stringify(data)}`,
      'ProjectSubCategoryService.update',
    );
    return this._projectSubCategoryRepository.update(data);
  }
  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TProjectSubCategory>> {
    this._loggerService.info(
      `Deleting project subcategory: ${id}`,
      'ProjectSubCategoryService.delete',
    );
    return this._projectSubCategoryRepository.delete(id);
  }
}
