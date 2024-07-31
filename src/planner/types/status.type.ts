import { TColor } from '@src/shared/types/color.type';
import { TUser } from '@src/user/types/user.type';

export type TStatus = {
  _id: string;
  name: string;
  description: string;
  owners: (TUser | string)[];
  createdAt: Date;
  updatedAt: Date;
} & TColor;

export type TStatusCreateDTO = Partial<Omit<TStatus, '_id'>>;
export type TStatusUpdateDTO = TStatusCreateDTO & Required<{ _id: string }>;
export function isTStatus(arg: any): arg is TStatus {
  return (
    arg !== 'undefined' &&
    arg._id !== 'undefined' &&
    arg.name !== 'undefined' &&
    arg.description !== 'undefined' &&
    arg.owners !== 'undefined' &&
    arg.createdAt !== 'undefined' &&
    arg.updatedAt !== 'undefined'
  );
}
export function isTStatusArray(arg: any): arg is TStatus[] {
  return Array.isArray(arg) && arg.every((v) => isTStatus(v));
}
export function asTStatus(arg: any): TStatus {
  if (isTStatus(arg)) {
    return arg;
  }
  throw new Error('Invalid TStatus');
}
export function isTStatusCreateDTO(arg: any): arg is TStatusCreateDTO {
  return true;
}
export function isTStatusUpdateDTO(arg: any): arg is TStatusUpdateDTO {
  return arg && arg._id;
}

export type TStatusParentType = 'project' | 'requeriment' | 'task' | 'feature';
