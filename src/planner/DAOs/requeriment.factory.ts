import { FactoryProvider, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBRequerimentDAO } from './mongo/mongoRequeriment.dao';
import { TRequerimentDAO } from '../types/daoPlanner.type';
export const RequerimentDaoFactory: Provider<FactoryProvider<TRequerimentDAO>> =
  {
    provide: 'RequerimentDAO',
    useFactory: (
      configService: ConfigService,
      mongoDBRequerimentDAO: MongoDBRequerimentDAO,
    ) => {
      return {
        mongodb: mongoDBRequerimentDAO,
      }[configService.get('persistence')];
    },
    inject: [ConfigService, MongoDBRequerimentDAO],
  };
