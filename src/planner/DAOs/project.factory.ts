import { FactoryProvider, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBProjectDAO } from './mongo/mongoProject.dao';
import { TProjectDAO } from '../types/daoPlanner.type';
export const ProjectDaoFactory: Provider<FactoryProvider<TProjectDAO>> = {
  provide: 'ProjectDAO',
  useFactory: (
    configService: ConfigService,
    mongoDBProjectDAO: MongoDBProjectDAO,
  ) => {
    return {
      mongodb: mongoDBProjectDAO,
    }[configService.get('persistence')];
  },
  inject: [ConfigService, MongoDBProjectDAO],
};
