import { IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { TFeatureCreateDTO } from '../types/feature.type';
export class CreateFeatureDTO implements TFeatureCreateDTO {
  @IsOptional()
  @IsString()
  public name: string;
  @IsOptional()
  @IsString()
  public description: string;
  @IsOptional()
  @IsDate()
  public createdAt: Date;
  @IsOptional()
  @IsDate()
  public updatedAt: Date;
  constructor(feature: TFeatureCreateDTO | undefined) {
    this.name = feature?.name || '';
    this.description = feature?.description || '';
    this.createdAt = feature?.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
