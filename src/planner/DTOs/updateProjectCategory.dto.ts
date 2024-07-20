import { IsOptional, IsString, IsDate } from '@nestjs/class-validator';
import { TProjectCategoryUpdateDTO } from '../types/projectCategory.type';
import { CreateProjectCategoryDTO } from './createProjectCategory.dto';
export class UpdateProjectCategoryDTO
  extends CreateProjectCategoryDTO
  implements TProjectCategoryUpdateDTO
{
  @IsString()
  public _id: string;
  @IsDate()
  @IsOptional()
  public createdAt: Date;
  @IsDate()
  @IsOptional()
  public updatedAt: Date;
  constructor(projectCategory: TProjectCategoryUpdateDTO) {
    super(projectCategory);
    this._id = projectCategory._id;
    this.updatedAt = new Date();
  }
}
