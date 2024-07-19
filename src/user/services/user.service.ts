import { Injectable } from '@nestjs/common';
/* Repositories */
import UserRepository from '@src/user/repositories/user.repository';
/* Types */
import { TUser } from '@src/user/types/user.type';
import { TUserRepository } from '@src/user/types/repositoryUser.type';
import { TRepositoryResponse } from '@src/shared/types/repositoryResponse.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateUserDTO } from '@src/user/DTOs/createUser.dto';
import { UpdateUserDTO } from '@src/user/DTOs/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}
  author(): { [key: string]: string } {
    return {
      author: 'Lynx Pardelle',
      site: 'https://lynxpardelle.com',
      github: 'https://github.com/LynxPardelle',
    };
  }

  /* Create */
  async create(data: CreateUserDTO): Promise<TRepositoryResponse<TUser>> {
    return await this._userRepository.create(data);
  }

  /* Read */
  async read(id: string): Promise<TRepositoryResponse<TUser>> {
    return await this._userRepository.read(id);
  }
  async readAll(args?: TSearch<TUser>): Promise<TRepositoryResponse<TUser[]>> {
    return await this._userRepository.readAll(args);
  }

  /* Update */
  async update(data: UpdateUserDTO): Promise<TRepositoryResponse<TUser>> {
    return await this._userRepository.update(data);
  }

  /* Delete */
  async delete(id: string): Promise<TRepositoryResponse<TUser>> {
    return await this._userRepository.delete(id);
  }
}
