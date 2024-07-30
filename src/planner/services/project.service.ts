import { Injectable } from '@nestjs/common';
/* Repositories */
import ProjectRepository from '../repositories/project.repository';
/* Types */
import { TProject } from '../types/project.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TProjectRepository } from '../types/repositoryPlanner.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateProjectDTO } from '../DTOs/createProject.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';
/* Services */
import { LoggerService } from '@src/shared/services/logger.service';
@Injectable()
export class ProjectService implements TProjectRepository {
  constructor(
    private _projectRepository: ProjectRepository,
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
  async create(data: CreateProjectDTO): Promise<TRepositoryResponse<TProject>> {
    this._loggerService.info(
      `Creating project: ${JSON.stringify(data)}`,
      'ProjectService.create',
    );
    return await this._projectRepository.create(data);
  }
  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TProject>> {
    this._loggerService.info(`Reading project: ${id}`, 'ProjectService.read');
    return await this._projectRepository.read(id);
  }
  async readAll(
    args?: TSearch<TProject>,
  ): Promise<TRepositoryResponse<TProject[]>> {
    this._loggerService.info(
      `Reading all projects: ${JSON.stringify(args)}`,
      'ProjectService.readAll',
    );
    return await this._projectRepository.readAll(args);
  }
  /* Update */
  async update(data: UpdateProjectDTO): Promise<TRepositoryResponse<TProject>> {
    this._loggerService.info(
      `Updating project: ${JSON.stringify(data)}`,
      'ProjectService.update',
    );
    return await this._projectRepository.update(data);
  }
  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TProject>> {
    this._loggerService.info(
      `Deleting project: ${id}`,
      'ProjectService.delete',
    );
    return await this._projectRepository.delete(id);
  }
}
