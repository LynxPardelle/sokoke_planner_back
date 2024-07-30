import { FactoryProvider, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBStatusDAO } from './mongo/mongoStatus.dao';
import { TStatusDAO } from '../types/daoPlanner.type';
export const StatusDaoFactory: Provider<FactoryProvider<TStatusDAO>> = {
  provide: 'StatusDAO',
  useFactory: (
    configService: ConfigService,
    mongoDBStatusDAO: MongoDBStatusDAO,
  ) => {
    return {
      mongodb: mongoDBStatusDAO,
    }[configService.get('persistence')];
  },
  inject: [ConfigService, MongoDBStatusDAO],
};
