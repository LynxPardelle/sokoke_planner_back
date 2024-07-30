import { FactoryProvider, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBProjectSubCategoryDAO } from './mongo/mongoProjectSubCategory.dao';
import { TProjectSubCategoryDAO } from '../types/daoPlanner.type';
export const ProjectSubCategoryDaoFactory: Provider<
  FactoryProvider<TProjectSubCategoryDAO>
> = {
  provide: 'ProjectSubCategoryDAO',
  useFactory: (
    configService: ConfigService,
    mongoDBProjectSubCategoryDAO: MongoDBProjectSubCategoryDAO,
  ) => {
    return {
      mongodb: mongoDBProjectSubCategoryDAO,
    }[configService.get('persistence')];
  },
  inject: [ConfigService, MongoDBProjectSubCategoryDAO],
};
