import { AsyncModelFactory } from '@nestjs/mongoose';
import { ObjectId, Model } from 'mongoose';
/* Types */
import { TProjectSubCategory } from '../types/projectSubCategory.type';
/* Schemas */
import {
  ProjectCategoryDocument,
  projectCategorySchema,
} from './projectCategory.schema';
import {
  ProjectSubCategoryDocument,
  ProjectSubCategoryModel,
} from './projectSubCategory.schema';
import { ProjectDocument, ProjectModel } from './project.schema';
export const projectCategorySchemaFactory: AsyncModelFactory = {
  name: 'ProjectCategory',
  imports: [],
  useFactory: (
    projectModel: Model<ProjectModel>,
    projectSubCategoryModel: Model<ProjectSubCategoryModel>,
  ) => {
    const schema = projectCategorySchema;
    schema.post('save', (doc: ProjectCategoryDocument) => {
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
    schema.post('findOneAndDelete', async (doc: ProjectCategoryDocument) => {
      console.log(`${doc._id} has been removed`);
      const projects: ProjectDocument[] = await projectModel.find({
        category: { $in: [doc._id] },
      });
      console.log('projects: ', projects);
      projects.forEach(async (project: ProjectDocument) => {
        console.log('updating project: ', project);
        delete project.category;
        delete project.subCategory;
        const projectUpdated: ProjectDocument =
          await projectModel.findByIdAndUpdate(project._id, project, {
            new: true,
          });
        console.log('project updated: ', projectUpdated);
      });
      doc.subCategories.forEach(
        async (subCategory: string | TProjectSubCategory | ObjectId) => {
          console.log('deleting subCategory: ', subCategory);
          const subCategory_id: string =
            typeof subCategory === 'string'
              ? (subCategory as string)
              : (subCategory as TProjectSubCategory)._id;
          console.log('subCategory_id: ', subCategory_id);
          const subCategoryDeleted: ProjectSubCategoryDocument =
            await projectSubCategoryModel.findByIdAndDelete(subCategory_id);
          console.log('subCategory deleted: ', subCategoryDeleted);
        },
      );
    });
    return schema;
  },
};
