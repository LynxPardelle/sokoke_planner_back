import { Injectable } from '@nestjs/common';
/* Repositories */
import TaskRepository from '../repositories/task.repository';
/* Types */
import { TTask, TTaskParentType } from '../types/task.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TTaskRepository } from '../types/repositoryPlanner.type';
import { TSearch } from '@src/shared/types/search.type';
import { TProject } from '../types/project.type';
/* DTOs */
import { CreateTaskDTO } from '../DTOs/createTask.dto';
import { UpdateTaskDTO } from '../DTOs/updateTask.dto';
import { UpdateProjectDTO } from '../DTOs/updateProject.dto';
/* Services */
import { LoggerService } from '@src/shared/services/logger.service';
import { ProjectService } from './project.service';
@Injectable()
export class TaskService implements TTaskRepository {
  constructor(
    private _taskRepository: TaskRepository,
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
    data: CreateTaskDTO,
    args: {
      parentId: string;
      parentType: TTaskParentType;
    },
  ): Promise<TRepositoryResponse<TTask>> {
    this._loggerService.info(
      `Creating task: ${JSON.stringify(data)}`,
      'TaskService.create',
    );
    if (!args.parentType) throw new Error('Parent type is required');
    let parentService: ProjectService | TaskService;
    switch (args.parentType) {
      case 'project':
        parentService = await this._projectService;
        break;
      case 'task':
        parentService = await this;
        break;
      default:
        throw new Error('Parent type not found');
    }
    const parent: TRepositoryResponse<TProject> | TRepositoryResponse<TTask> =
      await parentService.read(args.parentId);
    if (parent.status !== 'success') throw new Error('Parent not found');
    this._loggerService.info(
      `Parent found: ${JSON.stringify(parent.data)}`,
      'TaskService.create',
    );
    const newTask = await this._taskRepository.create(data);
    this._loggerService.info(
      `Task created: ${JSON.stringify(newTask)}`,
      'TaskService.create',
    );
    if (newTask.status === 'error') throw new Error('Error creating task');
    parent.data.tasks.push(newTask.data._id);
    const updatedParent = await parentService.update(
      parent.data as UpdateProjectDTO & UpdateTaskDTO,
    );
    this._loggerService.info(
      `Parent updated: ${JSON.stringify(updatedParent)}`,
      'TaskService.create',
    );
    return newTask;
  }
  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TTask>> {
    this._loggerService.info(`Reading task: ${id}`, 'TaskService.read');
    return this._taskRepository.read(id);
  }
  async readAll(args?: TSearch<TTask>): Promise<TRepositoryResponse<TTask[]>> {
    this._loggerService.info(
      `Reading all tasks: ${JSON.stringify(args)}`,
      'TaskService.readAll',
    );
    return this._taskRepository.readAll(args);
  }
  /* Update */
  async update(data: UpdateTaskDTO): Promise<TRepositoryResponse<TTask>> {
    return this._taskRepository.update(data);
  }
  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TTask>> {
    this._loggerService.info(`Deleting task: ${id}`, 'TaskService.delete');
    return this._taskRepository.delete(id);
  }
}
