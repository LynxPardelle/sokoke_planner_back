import { TStatus } from './status.type';
import { TTask } from './task.type';

export type TRequeriment = {
  _id: string;
  name: string;
  description: string;
  status: TStatus | string;
  lastCheckStatus: Date;
  tasks: (TTask | string)[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TRequerimentCreateDTO = Partial<Omit<TRequeriment, '_id'>>;
export type TRequerimentUpdateDTO = TRequerimentCreateDTO &
  Required<{ _id: string }>;
export function isTRequeriment(arg: any): arg is TRequeriment {
  return (
    arg !== 'undefined' &&
    arg._id !== 'undefined' &&
    arg.name !== 'undefined' &&
    arg.description !== 'undefined' &&
    arg.status !== 'undefined' &&
    arg.lastCheckStatus !== 'undefined' &&
    arg.tasks !== 'undefined' &&
    arg.completed !== 'undefined' &&
    arg.createdAt !== 'undefined' &&
    arg.updatedAt !== 'undefined'
  );
}
export function isTRequerimentArray(arg: any): arg is TRequeriment[] {
  return Array.isArray(arg) && arg.every((v) => isTRequeriment(v));
}
export function asTRequeriment(arg: any): TRequeriment {
  if (isTRequeriment(arg)) {
    return arg;
  }
  throw new Error('Invalid TRequeriment');
}
export function isTRequerimentCreateDTO(
  arg: any,
): arg is TRequerimentCreateDTO {
  return true;
}
export function isTRequerimentUpdateDTO(
  arg: any,
): arg is TRequerimentUpdateDTO {
  return arg && arg._id;
}
