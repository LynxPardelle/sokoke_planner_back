import { AsyncModelFactory } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
/* Schemas */
import { TaskDocument, TaskModel, taskSchema } from './task.schema';
import { asTTask, TTask } from '../types/task.type';
export const taskSchemaFactory: AsyncModelFactory = {
  name: 'Task',
  imports: [],
  useFactory: (taskModel: Model<TaskModel>) => {
    const schema = taskSchema;
    schema.post('save', (doc: TaskDocument) => {
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
    schema.post('findOneAndDelete', async (doc: TaskDocument) => {
      console.log(`${doc._id} has been removed`);
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
