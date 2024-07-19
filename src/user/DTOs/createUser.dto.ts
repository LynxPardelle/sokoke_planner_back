import { IsOptional, IsString } from '@nestjs/class-validator';
import { TUserCreateDTO } from '../types/user.type';
export class CreateUserDTO implements TUserCreateDTO {
  @IsOptional()
  @IsString()
  public name: string;
  @IsOptional()
  @IsString()
  public lastName: string;
  @IsOptional()
  @IsString()
  public email: string;
  @IsOptional()
  @IsString()
  public phone: string;
  @IsOptional()
  @IsString()
  public username: string;
  @IsOptional()
  @IsString()
  public password: string;
  constructor(user: TUserCreateDTO | undefined) {
    this.name = user?.name;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.phone = user?.phone;
    this.username = user?.username;
    this.password = user?.password;
  }
}
