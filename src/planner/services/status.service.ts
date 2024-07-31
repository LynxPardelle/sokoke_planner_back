import { Injectable } from '@nestjs/common';
/* Repositories */
import StatusRepository from '../repositories/status.repository';
/* Types */
import { TStatus, TStatusParentType } from '../types/status.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TStatusRepository } from '../types/repositoryPlanner.type';
import { TSearch } from '@src/shared/types/search.type';
import { TProject } from '../types/project.type';
import { TRequeriment } from '../types/requeriment.type';
import { TTask } from '../types/task.type';
/* DTOs */
import { CreateStatusDTO } from '../DTOs/createStatus.dto';
import { UpdateStatusDTO } from '../DTOs/updateStatus.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';
import { UpdateRequerimentDTO } from '../DTOs/updateRequeriment.dto';
import { UpdateTaskDTO } from '../DTOs/updateTask.dto';
/* Services */
import { LoggerService } from '@src/shared/services/logger.service';
import { ProjectService } from './project.service';
import { RequerimentService } from './requeriment.service';
import { TaskService } from './task.service';
import { FeatureService } from './feature.service';
import { TFeature } from '../types/feature.type';
@Injectable()
export class StatusService implements TStatusRepository {
  constructor(
    private _loggerService: LoggerService,
    private _statusRepository: StatusRepository,
    private _projectService: ProjectService,
    private _requerimentService: RequerimentService,
    private _taskService: TaskService,
    private _featureService: FeatureService,
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
    data: CreateStatusDTO,
    args: {
      parentId: string;
      parentType: TStatusParentType;
    },
  ): Promise<TRepositoryResponse<TStatus>> {
    this._loggerService.info(
      `Creating status: ${JSON.stringify(data)}`,
      'StatusService.create',
    );
    if (!args.parentType) throw new Error('Parent type is required');
    let parentService:
      | ProjectService
      | RequerimentService
      | TaskService
      | FeatureService;
    switch (args.parentType) {
      case 'project':
        parentService = await this._projectService;
        break;
      case 'requeriment':
        parentService = await this._requerimentService;
        break;
      case 'task':
        parentService = await this._taskService;
        break;
      case 'feature':
        parentService = await this._featureService;
        break;
      default:
        throw new Error('Parent type not found');
    }
    if (!args.parentId) throw new Error('Parent ID is required');
    const parent:
      | TRepositoryResponse<TProject>
      | TRepositoryResponse<TTask>
      | TRepositoryResponse<TRequeriment>
      | TRepositoryResponse<TFeature> = await parentService.read(args.parentId);
    if (parent.status !== 'success') throw new Error('Parent not found');
    this._loggerService.info(
      `Parent found: ${JSON.stringify(parent.data)}`,
      'StatusService.create',
    );
    const newStatus = await this._statusRepository.create(data);
    this._loggerService.info(
      `Status created: ${JSON.stringify(newStatus)}`,
      'StatusService.create',
    );
    if (newStatus.status === 'error') throw new Error('Error creating status');
    parent.data.status = newStatus.data._id;
    const updatedParent: TRepositoryResponse<TProject | TRequeriment | TTask> =
      await parentService.update(
        parent.data as UpdateProjectDTO & UpdateRequerimentDTO & UpdateTaskDTO,
      );
    this._loggerService.info(
      `Parent updated: ${JSON.stringify(updatedParent)}`,
      'StatusService.create',
    );
    return newStatus;
  }
  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TStatus>> {
    this._loggerService.info(`Reading status: ${id}`, 'StatusService.read');
    return this._statusRepository.read(id);
  }
  async readAll(
    args?: TSearch<TStatus>,
  ): Promise<TRepositoryResponse<TStatus[]>> {
    this._loggerService.info(
      `Reading all statuses: ${JSON.stringify(args)}`,
      'StatusService.readAll',
    );
    return this._statusRepository.readAll(args);
  }
  /* Update */
  async update(data: UpdateStatusDTO): Promise<TRepositoryResponse<TStatus>> {
    this._loggerService.info(
      `Updating status: ${JSON.stringify(data)}`,
      'StatusService.update',
    );
    return this._statusRepository.update(data);
  }
  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TStatus>> {
    this._loggerService.info(`Deleting status: ${id}`, 'StatusService.delete');
    return this._statusRepository.delete(id);
  }
}
