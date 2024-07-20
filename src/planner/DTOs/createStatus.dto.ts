import { IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { TStatusCreateDTO } from '../types/status.type';
import { colorDTO } from '@src/shared/DTOs/color.dto';
export class CreateStatusDTO extends colorDTO implements TStatusCreateDTO {
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
  constructor(status: TStatusCreateDTO | undefined) {
    super(status);
    this.name = status?.name || '';
    this.description = status?.description || '';
    this.createdAt = status?.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
