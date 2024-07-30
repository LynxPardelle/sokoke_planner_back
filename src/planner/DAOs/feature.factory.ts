import { FactoryProvider, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBFeatureDAO } from './mongo/mongoFeature.dao';
import { TFeatureDAO } from '../types/daoPlanner.type';
export const FeatureDaoFactory: Provider<FactoryProvider<TFeatureDAO>> = {
  provide: 'FeatureDAO',
  useFactory: (
    configService: ConfigService,
    mongoDBFeatureDAO: MongoDBFeatureDAO,
  ) => {
    return {
      mongodb: mongoDBFeatureDAO,
    }[configService.get('persistence')];
  },
  inject: [ConfigService, MongoDBFeatureDAO],
};
