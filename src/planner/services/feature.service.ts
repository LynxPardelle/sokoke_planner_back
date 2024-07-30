import { Injectable } from '@nestjs/common';
/* Repositories */
import FeatureRepository from '../repositories/feature.repository';
/* Types */
import { TFeature } from '../types/feature.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TFeatureRepository } from '../types/repositoryPlanner.type';
import { TSearch } from '@src/shared/types/search.type';
import { TProject } from '../types/project.type';
/* DTOs */
import { CreateFeatureDTO } from '../DTOs/createFeature.dto';
import { UpdateFeatureDTO } from '../DTOs/updateFeature.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';
/* Services */
import { LoggerService } from '@src/shared/services/logger.service';
import { ProjectService } from './project.service';
@Injectable()
export class FeatureService implements TFeatureRepository {
  constructor(
    private _featureRepository: FeatureRepository,
    private _loggerService: LoggerService,
    private _projectService: ProjectService,
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
    data: CreateFeatureDTO,
    args: {
      projectId: string;
    },
  ): Promise<TRepositoryResponse<TFeature>> {
    this._loggerService.info(
      `Creating feature: ${JSON.stringify(data)}`,
      'FeatureService.create',
    );
    if (!args.projectId) throw new Error('Project ID is required');
    const project: TRepositoryResponse<TProject> =
      await this._projectService.read(args.projectId);
    if (project.status !== 'success') throw new Error('Project not found');
    this._loggerService.info(
      `Project found: ${JSON.stringify(project.data)}`,
      'FeatureService.create',
    );
    const newFeature = await this._featureRepository.create(data);
    this._loggerService.info(
      `Feature created: ${JSON.stringify(newFeature)}`,
      'FeatureService.create',
    );
    if (newFeature.status === 'error')
      throw new Error('Error creating feature');
    project.data.features.push(newFeature.data._id);
    const updatedProject = await this._projectService.update(
      project.data as UpdateProjectDTO,
    );
    this._loggerService.info(
      `Project updated: ${JSON.stringify(updatedProject)}`,
      'FeatureService.create',
    );
    if (updatedProject.status === 'error')
      throw new Error('Error updating project');
    return newFeature;
  }
  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TFeature>> {
    this._loggerService.info(`Reading feature: ${id}`, 'FeatureService.read');
    return this._featureRepository.read(id);
  }
  async readAll(
    args?: TSearch<TFeature>,
  ): Promise<TRepositoryResponse<TFeature[]>> {
    this._loggerService.info(
      `Reading all features: ${JSON.stringify(args)}`,
      'FeatureService.readAll',
    );
    return this._featureRepository.readAll(args);
  }
  /* Update */
  async update(data: UpdateFeatureDTO): Promise<TRepositoryResponse<TFeature>> {
    return this._featureRepository.update(data);
  }
  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TFeature>> {
    this._loggerService.info(
      `Deleting feature: ${id}`,
      'FeatureService.delete',
    );
    return this._featureRepository.delete(id);
  }
}
