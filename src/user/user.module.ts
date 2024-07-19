import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/* Modules */
import { SharedModule } from '@src/shared/shared.module';
/* Controllers */
import { UserController } from './controllers/user.controller';
/* Services */
import { UserService } from './services/user.service';
/* Repositories */
import UserRepository from './repositories/user.repository';
/* Factories */
import { UserDaoFactory } from './DAOs/user.factory';
/* Schemas */
import { userModuleSchemaFactory } from './schemas/user.module.schema.factory';
/* DAOs */
import { MongoDBUserDAO } from './DAOs/mongo/mongoUser.dao';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(userModuleSchemaFactory),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [
    /* Services */
    UserService,
    /* Repositories */
    UserRepository,
    /* Factories */
    UserDaoFactory,
    /* DAOs */
    MongoDBUserDAO,
  ],
  exports: [
    /* Services */
    UserService,
    /* Repositories */
    UserRepository,
    /* Factories */
    UserDaoFactory,
    /* DAOs */
    MongoDBUserDAO,
    /* MongoDB */
    MongooseModule,
  ],
})
export class UserModule {}
