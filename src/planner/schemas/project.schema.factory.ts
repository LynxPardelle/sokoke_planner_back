import { AsyncModelFactory } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
/* Types */
import { asTFeature, TFeature } from '../types/feature.type';
import { asTRequeriment, TRequeriment } from '../types/requeriment.type';
import { asTTask, TTask } from '../types/task.type';
/* Schemas */
import { FeatureDocument, FeatureModel } from './feature.schema';
import { ProjectDocument, projectSchema } from './project.schema';
import { RequerimentDocument, RequerimentModel } from './requeriment.schema';
import { TaskDocument, TaskModel } from './task.schema';
export const projectSchemaFactory: AsyncModelFactory = {
  name: 'Project',
  imports: [],
  useFactory: (
    featureModel: Model<FeatureModel>,
    requerimentModel: Model<RequerimentModel>,
    taskModel: Model<TaskModel>,
  ) => {
    const schema = projectSchema;
    schema.post('save', (doc: ProjectDocument) => {
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
    schema.post('findOneAndDelete', async (doc: ProjectDocument) => {
      console.log(`${doc._id} has been removed`);
      doc.features.forEach(async (feature: string | TFeature | ObjectId) => {
        console.log('deleting feature: ', feature);
        const feature_id: string =
          typeof feature === 'string'
            ? (feature as string)
            : asTFeature(feature)._id;
        console.log('feature_id: ', feature_id);
        const featureDeleted: FeatureDocument =
          await featureModel.findByIdAndDelete(feature_id);
        console.log('feature deleted: ', featureDeleted);
      });
      doc.requeriments.forEach(
        async (requeriment: string | TRequeriment | ObjectId) => {
          console.log('deleting requeriment: ', requeriment);
          const requeriment_id: string =
            typeof requeriment === 'string'
              ? (requeriment as string)
              : asTRequeriment(requeriment)._id;
          console.log('requeriment_id: ', requeriment_id);
          const requerimentDeleted: RequerimentDocument =
            await requerimentModel.findByIdAndDelete(requeriment_id);
          console.log('requeriment deleted: ', requerimentDeleted);
        },
      );
      doc.tasks.forEach(async (task: string | TTask | ObjectId) => {
        console.log('deleting task: ', task);
        const task_id: string =
          typeof task === 'string' ? (task as string) : asTTask(task)._id;
        console.log('task_id: ', task_id);
        const taskDeleted: TaskDocument =
          await taskModel.findByIdAndDelete(task_id);
        console.log('task deleted: ', taskDeleted);
      });
    });
    return schema;
  },
  inject: [],
};
