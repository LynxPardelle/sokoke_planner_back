/* Types */
import { TRepository } from '@src/shared/types/repository.type';
import { TUser } from './user.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateUserDTO } from '../DTOs/createUser.dto';
import { UpdateUserDTO } from '../DTOs/updateUser.dto';
export declare type TUserRepository = TRepository<
  CreateUserDTO,
  undefined,
  undefined,
  TSearch<TUser>,
  UpdateUserDTO,
  undefined,
  undefined,
  TUser
>;
