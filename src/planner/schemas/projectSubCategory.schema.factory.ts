import { AsyncModelFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
/* Schemas */
import {
  ProjectCategoryDocument,
  ProjectCategoryModel,
} from './projectCategory.schema';
import {
  ProjectSubCategoryDocument,
  projectSubCategorySchema,
} from './projectSubCategory.schema';
import { ProjectDocument, ProjectModel } from './project.schema';
export const projectSubCategorySchemaFactory: AsyncModelFactory = {
  name: 'ProjectSubCategory',
  imports: [],
  useFactory: (
    projectModel: Model<ProjectModel>,
    projectCategoryModel: Model<ProjectCategoryModel>,
  ) => {
    const schema = projectSubCategorySchema;
    schema.post('save', (doc: ProjectSubCategoryDocument) => {
      console.log('%s has been saved', doc._id);
    });
    schema.pre('validate', function (next) {
      console.log('validate', this);
      next();
    });
    schema.pre('save', function (next) {
      console.log('save', this);
      next();
    });
    schema.post('findOneAndDelete', async (doc: ProjectSubCategoryDocument) => {
      console.log(`${doc._id} has been removed`);
      const categories: ProjectCategoryDocument[] =
        await projectCategoryModel.find({
          subCategories: { $in: [doc._id] },
        });
      console.log('categories: ', categories);
      categories.forEach(async (category: ProjectCategoryDocument) => {
        console.log('updating category: ', category);
        const categoryUpdated: ProjectCategoryDocument =
          await projectCategoryModel.findByIdAndUpdate(
            category._id,
            { $pull: { subCategories: doc._id } },
            { new: true },
          );
        console.log('category updated: ', categoryUpdated);
      });
      const projects: ProjectDocument[] = await projectModel.find({
        subCategory: { $in: [doc._id] },
      });
      console.log('projects: ', projects);
      projects.forEach(async (project: ProjectDocument) => {
        console.log('updating project: ', project);
        delete project.subCategory;
        const projectUpdated: ProjectDocument =
          await projectModel.findByIdAndUpdate(project._id, project, {
            new: true,
          });
        console.log('project updated: ', projectUpdated);
      });
    });
    return schema;
  },
  inject: [],
};
