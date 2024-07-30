import { Injectable } from '@nestjs/common';
/* Repositories */
import RequerimentRepository from '../repositories/requeriment.repository';
/* Types */
import { TRequeriment } from '../types/requeriment.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TRequerimentRepository } from '../types/repositoryPlanner.type';
import { TSearch } from '@src/shared/types/search.type';
import { TProject } from '../types/project.type';
/* DTOs */
import { CreateRequerimentDTO } from '../DTOs/createRequeriment.dto';
import { UpdateRequerimentDTO } from '../DTOs/updateRequeriment.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';
/* Services */
import { LoggerService } from '@src/shared/services/logger.service';
import { ProjectService } from './project.service';
@Injectable()
export class RequerimentService implements TRequerimentRepository {
  constructor(
    private _requerimentRepository: RequerimentRepository,
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
    data: CreateRequerimentDTO,
    args: {
      projectId: string;
    },
  ): Promise<TRepositoryResponse<TRequeriment>> {
    this._loggerService.info(
      `Creating requeriment: ${JSON.stringify(data)}`,
      'RequerimentService.create',
    );
    if (!args.projectId) throw new Error('Project ID is required');
    const project: TRepositoryResponse<TProject> =
      await this._projectService.read(args.projectId);
    if (project.status !== 'success') throw new Error('Project not found');
    this._loggerService.info(
      `Project found: ${JSON.stringify(project.data)}`,
      'RequerimentService.create',
    );
    const newRequeriment = await this._requerimentRepository.create(data);
    this._loggerService.info(
      `Requeriment created: ${JSON.stringify(newRequeriment)}`,
      'RequerimentService.create',
    );
    if (newRequeriment.status === 'error')
      throw new Error('Error creating requeriment');
    project.data.requeriments.push(newRequeriment.data._id);
    const updatedProject = await this._projectService.update(
      project.data as UpdateProjectDTO,
    );
    this._loggerService.info(
      `Project updated: ${JSON.stringify(updatedProject)}`,
      'RequerimentService.create',
    );
    return newRequeriment;
  }
  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TRequeriment>> {
    this._loggerService.info(
      `Reading requeriment: ${id}`,
      'RequerimentService.read',
    );
    return await this._requerimentRepository.read(id);
  }
  async readAll(
    args?: TSearch<TRequeriment>,
  ): Promise<TRepositoryResponse<TRequeriment[]>> {
    this._loggerService.info(
      `Reading all requeriments: ${JSON.stringify(args)}`,
      'RequerimentService.readAll',
    );
    return await this._requerimentRepository.readAll(args);
  }
  /* Update */
  async update(
    data: UpdateRequerimentDTO,
  ): Promise<TRepositoryResponse<TRequeriment>> {
    this._loggerService.info(
      `Updating requeriment: ${JSON.stringify(data)}`,
      'RequerimentService.update',
    );
    return await this._requerimentRepository.update(data);
  }
  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TRequeriment>> {
    this._loggerService.info(
      `Deleting requeriment: ${id}`,
      'RequerimentService.delete',
    );
    return await this._requerimentRepository.delete(id);
  }
}
