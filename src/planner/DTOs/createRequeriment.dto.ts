import { IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { isTStatus } from '../types/status.type';
import { TRequerimentCreateDTO } from '../types/requeriment.type';
export class CreateRequerimentDTO {
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
  public createdAt: Date;
  @IsOptional()
  @IsDate()
  public updatedAt: Date;
  constructor(requeriment: TRequerimentCreateDTO | undefined) {
    this.name = requeriment?.name;
    this.description = requeriment?.description;
    this.status = requeriment?.status
      ? typeof requeriment?.status === 'object' &&
        isTStatus(requeriment?.status)
        ? requeriment?.status?._id
        : (requeriment?.status as string)
      : undefined;
    this.createdAt = requeriment.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
