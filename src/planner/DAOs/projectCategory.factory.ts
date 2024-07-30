import { FactoryProvider, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBProjectCategoryDAO } from './mongo/mongoProjectCategory.dao';
import { TProjectCategoryDAO } from '../types/daoPlanner.type';
export const ProjectCategoryDaoFactory: Provider<
  FactoryProvider<TProjectCategoryDAO>
> = {
  provide: 'ProjectCategoryDAO',
  useFactory: (
    configService: ConfigService,
    mongoDBProjectCategoryDAO: MongoDBProjectCategoryDAO,
  ) => {
    return {
      mongodb: mongoDBProjectCategoryDAO,
    }[configService.get('persistence')];
  },
  inject: [ConfigService, MongoDBProjectCategoryDAO],
};
