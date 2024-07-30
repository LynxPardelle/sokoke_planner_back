import { AsyncModelFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
/* Schemas */
import { StatusDocument, statusSchema } from './status.schema';
import { TaskDocument, TaskModel } from './task.schema';
import { ProjectDocument, ProjectModel } from './project.schema';
import { RequerimentDocument, RequerimentModel } from './requeriment.schema';
export const statusSchemaFactory: AsyncModelFactory = {
  name: 'Status',
  imports: [],
  useFactory: (
    projectModel: Model<ProjectModel>,
    taskModel: Model<TaskModel>,
    requerimentModel: Model<RequerimentModel>,
  ) => {
    const schema = statusSchema;
    schema.post('save', (doc: StatusDocument) => {
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
    schema.post('findOneAndDelete', async (doc: StatusDocument) => {
      console.log(`${doc._id} has been removed`);
      const tasks: TaskDocument[] = await taskModel.find({
        status: doc._id,
      });
      console.log('tasks: ', tasks);
      tasks.forEach(async (task: TaskDocument) => {
        console.log('updating task: ', task);
        delete task.status;
        const taskUpdated: TaskDocument = await taskModel.findByIdAndUpdate(
          task._id,
          task,
          { new: true },
        );
        console.log('task updated: ', taskUpdated);
      });
      const projects: ProjectDocument[] = await projectModel.find({
        status: doc._id,
      });
      console.log('projects: ', projects);
      projects.forEach(async (project: ProjectDocument) => {
        console.log('updating project: ', project);
        delete project.status;
        const projectUpdated: ProjectDocument =
          await projectModel.findByIdAndUpdate(project._id, project, {
            new: true,
          });
        console.log('project updated: ', projectUpdated);
      });
      const requeriments: RequerimentDocument[] = await requerimentModel.find({
        status: doc._id,
      });
      console.log('requeriments: ', requeriments);
      requeriments.forEach(async (requeriment: RequerimentDocument) => {
        console.log('updating requeriment: ', requeriment);
        delete requeriment.status;
        const requerimentUpdated: RequerimentDocument =
          await requerimentModel.findByIdAndUpdate(
            requeriment._id,
            requeriment,
            {
              new: true,
            },
          );
        console.log('requeriment updated: ', requerimentUpdated);
      });
    });
    return schema;
  },
  inject: [],
};
