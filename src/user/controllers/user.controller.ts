import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { Validate } from '@nestjs/class-validator';
/* DTOs */
import { CreateUserDTO } from '@src/user/DTOs/createUser.dto';
import { UpdateUserDTO } from '@src/user/DTOs/updateUser.dto';
/* Services */
import { UserService } from '@src/user/services/user.service';
import { LoggerService } from '@src/shared/services/logger.service';

@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService,
    private _loggerService: LoggerService,
  ) {}
  @Get('author')
  author(): { [key: string]: string } {
    this._loggerService.info('LogController.author');
    return this._userService.author();
  }
  @Post('')
  @Validate(CreateUserDTO)
  async create(@Body() data: CreateUserDTO) {
    this._loggerService.info('LogController.create', 'LogController');
    this._loggerService.info(
      `data: ${JSON.stringify(data)}`,
      'LogController.create',
    );
    return await this._userService.create(data);
  }
  @Get(':id')
  async read(@Param('id') id: string) {
    if (!id) throw new Error('Id is required');
    return await this._userService.read(id);
  }
  @Get('')
  async readAll() {
    return await this._userService.readAll();
  }
  @Put(':id')
  @Validate(UpdateUserDTO)
  async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    if (!id) throw new Error('Id is required');
    return await this._userService.update(data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!id) throw new Error('Id is required');
    return await this._userService.delete(id);
  }
}
