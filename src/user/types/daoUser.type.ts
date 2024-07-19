/* Types */
import { TDAO } from '@src/shared/types/dao.type';
import { TUser } from './user.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateUserDTO } from '../DTOs/createUser.dto';
import { UpdateUserDTO } from '../DTOs/updateUser.dto';

export type TUserDAO = TDAO<
  CreateUserDTO,
  TSearch<TUser>,
  UpdateUserDTO,
  TUser
>;
