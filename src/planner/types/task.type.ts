import { TColor } from '@src/shared/types/color.type';

export type TTask = {
  _id: string;
  name: string;
  description: string;
  status: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
} & TColor;

export type TTaskCreateDTO = Partial<Omit<TTask, '_id'>>;
export type TTaskUpdateDTO = TTaskCreateDTO & Required<{ _id: string }>;
export function isTTask(arg: any): arg is TTask {
  return (
    arg !== 'undefined' &&
    arg._id !== 'undefined' &&
    arg.name !== 'undefined' &&
    arg.description !== 'undefined' &&
    arg.status !== 'undefined' &&
    arg.dueDate !== 'undefined' &&
    arg.createdAt !== 'undefined' &&
    arg.updatedAt !== 'undefined'
  );
}
export function isTTaskArray(arg: any): arg is TTask[] {
  return Array.isArray(arg) && arg.every((v) => isTTask(v));
}
export function asTTask(arg: any): TTask {
  if (isTTask(arg)) {
    return arg;
  }
  throw new Error('Invalid TTask');
}
export function isTTaskCreateDTO(arg: any): arg is TTaskCreateDTO {
  return true;
}
export function isTTaskUpdateDTO(arg: any): arg is TTaskUpdateDTO {
  return arg && arg._id;
}
