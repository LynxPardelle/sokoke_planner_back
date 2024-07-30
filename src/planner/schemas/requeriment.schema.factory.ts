import { AsyncModelFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
/* Schemas */
import { RequerimentDocument, requerimentSchema } from './requeriment.schema';
import { ProjectDocument, ProjectModel } from './project.schema';
export const requerimentSchemaFactory: AsyncModelFactory = {
  name: 'Requeriment',
  imports: [],
  useFactory: (projectModel: Model<ProjectModel>) => {
    const schema = requerimentSchema;
    schema.post('save', (doc: RequerimentDocument) => {
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
    schema.post('findOneAndDelete', async (doc: RequerimentDocument) => {
      console.log(`${doc._id} has been removed`);
      const projects: ProjectDocument[] = await projectModel.find({
        requeriments: { $in: [doc._id] },
      });
      console.log('projects: ', projects);
      projects.forEach(async (project: ProjectDocument) => {
        console.log('updating project: ', project);
        const projectUpdated: ProjectDocument =
          await projectModel.findByIdAndUpdate(
            project._id,
            { $pull: { requeriments: doc._id } },
            { new: true },
          );
        console.log('project updated: ', projectUpdated);
      });
    });
    return schema;
  },
  inject: [],
};
