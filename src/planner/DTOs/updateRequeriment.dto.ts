import { IsOptional, IsString, IsDate } from '@nestjs/class-validator';
import { TRequerimentUpdateDTO } from '../types/requeriment.type';
import { CreateRequerimentsDTO } from './createRequeriment.dto';
export class UpdateRequerimentDTO
  extends CreateRequerimentsDTO
  implements TRequerimentUpdateDTO
{
  @IsString()
  public _id: string;
  @IsDate()
  @IsOptional()
  public createdAt: Date;
  @IsDate()
  @IsOptional()
  public updatedAt: Date;
  constructor(requeriment: TRequerimentUpdateDTO) {
    super(requeriment);
    this._id = requeriment._id;
    this.updatedAt = new Date();
  }
}
