import { FactoryProvider, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBTaskDAO } from './mongo/mongoTask.dao';
import { TTaskDAO } from '../types/daoPlanner.type';
export const TaskDaoFactory: Provider<FactoryProvider<TTaskDAO>> = {
  provide: 'TaskDAO',
  useFactory: (
    configService: ConfigService,
    mongoDBTaskDAO: MongoDBTaskDAO,
  ) => {
    return {
      mongodb: mongoDBTaskDAO,
    }[configService.get('persistence')];
  },
  inject: [ConfigService, MongoDBTaskDAO],
};
