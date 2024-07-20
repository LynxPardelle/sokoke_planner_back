import { IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { TTaskCreateDTO } from '../types/task.type';
import { colorDTO } from '@src/shared/DTOs/color.dto';
export class CreateTaskDTO extends colorDTO implements TTaskCreateDTO {
  @IsOptional()
  @IsString()
  public name: string;
  @IsOptional()
  @IsString()
  public description: string;
  @IsOptional()
  @IsString()
  public status: string;
  @IsOptional()
  @IsDate()
  public dueDate: Date;
  @IsOptional()
  @IsDate()
  public createdAt: Date;
  @IsOptional()
  @IsDate()
  public updatedAt: Date;
  constructor(task: TTaskCreateDTO | undefined) {
    super(task);
    this.name = task?.name || '';
    this.description = task?.description || '';
    this.status = task?.status || '';
    this.dueDate = task?.dueDate || new Date();
    this.createdAt = task?.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
