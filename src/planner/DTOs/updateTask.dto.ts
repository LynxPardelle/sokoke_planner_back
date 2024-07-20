import { IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { TTaskUpdateDTO } from '../types/task.type';
import { CreateTaskDTO } from './createTask.dto';
export class UpdateTaskDTO extends CreateTaskDTO implements TTaskUpdateDTO {
  @IsString()
  public _id: string;
  @IsDate()
  @IsOptional()
  public createdAt: Date;
  @IsDate()
  @IsOptional()
  public updatedAt: Date;
  constructor(task: TTaskUpdateDTO) {
    super(task);
    this._id = task._id;
    this.updatedAt = new Date();
  }
}
