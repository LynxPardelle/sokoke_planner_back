import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
/* Types */
import { TTaskDAO } from '@src/planner/types/daoPlanner.type';
import { TTask, asTTask } from '@src/planner/types/task.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateTaskDTO } from '@src/planner/DTOs/createTask.dto';
import { UpdateTaskDTO } from '@src/planner/DTOs/updateTask.dto';
/* Schemas */
import { TaskModel, TaskDocument } from '@src/planner/schemas/task.schema';
@Injectable()
export class MongoDBTaskDAO implements TTaskDAO {
  constructor(@InjectModel('Task') private _taskModel: TaskModel) {}
  async create(data: CreateTaskDTO): Promise<TTask> {
    let newTask: TaskDocument = new this._taskModel(data);
    newTask = await newTask.save();
    if (!newTask || !newTask._id) {
      throw new Error('Error creating task');
    }
    return asTTask(newTask);
  }
  async read(id: string): Promise<TTask> {
    const task: TaskDocument | null = await this._taskModel.findById(id);
    if (!task) throw new Error('Task not found');
    return asTTask(task);
  }
  async readAll(args?: TSearch<TTask>): Promise<TTask[]> {
    const tasks: TaskDocument[] = await this._taskModel.find();
    if (!tasks) throw new Error('Tasks not found');
    if (!tasks.length) throw new Error("Tasks doesn't contain anything");
    return tasks.map(asTTask);
  }
  async update(task: UpdateTaskDTO): Promise<TTask> {
    const taskUpdated: TaskDocument | null =
      await this._taskModel.findByIdAndUpdate(task._id, task, {
        new: true,
      });
    if (!taskUpdated) throw new Error('Task not found');
    return asTTask(taskUpdated);
  }
  async delete(id: string): Promise<TTask> {
    const taskDeleted: TaskDocument | null =
      await this._taskModel.findByIdAndDelete(id);
    if (!taskDeleted) throw new Error('Task not found');
    return asTTask(taskDeleted);
  }
}
