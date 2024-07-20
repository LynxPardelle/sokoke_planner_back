import { TColor } from '@src/shared/types/color.type';
import { TUser } from '@src/user/types/user.type';
import { TFeature } from './feature.type';
import { TProjectCategory } from './projectCategory.type';
import { TProjectSubCategory } from './projectSubCategory.type';
import { TRequeriment } from './requeriment.type';
import { TStatus } from './status.type';
import { TTask } from './task.type';

export type TProject = {
  _id: string;
  owners: (TUser | string)[];
  name: string;
  description: string;
  category: TProjectCategory | string;
  subCategory: TProjectSubCategory | string;
  startDate: Date;
  endDate: Date | undefined;
  features: (TFeature | string)[];
  requeriments: (TRequeriment | string)[];
  approximateTimeProjection: number;
  status: TStatus | string;
  lastCheckStatus: Date;
  tasks: (TTask | string)[];
  priority: number;
  impact: number;
  impactDescription: string;
  createdAt: Date;
  updatedAt: Date;
} & TColor;

export type TProjectCreateDTO = Partial<Omit<TProject, '_id'>>;
export type TProjectUpdateDTO = TProjectCreateDTO & Required<{ _id: string }>;
export function isTProject(arg: any): arg is TProject {
  return (
    arg !== 'undefined' &&
    arg._id !== 'undefined' &&
    arg.name !== 'undefined' &&
    arg.description !== 'undefined' &&
    arg.category !== 'undefined' &&
    arg.subCategory !== 'undefined' &&
    arg.startDate !== 'undefined' &&
    arg.features !== 'undefined' &&
    arg.requeriments !== 'undefined' &&
    arg.approximateTimeProjection !== 'undefined' &&
    arg.status !== 'undefined' &&
    arg.lastCheckStatus !== 'undefined' &&
    arg.tasks !== 'undefined' &&
    arg.priority !== 'undefined' &&
    arg.impact !== 'undefined' &&
    arg.impactDescription !== 'undefined' &&
    arg.createdAt !== 'undefined' &&
    arg.updatedAt !== 'undefined'
  );
}
export function isTProjectArray(arg: any): arg is TProject[] {
  return Array.isArray(arg) && arg.every((v) => isTProject(v));
}
export function asTProject(arg: any): TProject {
  if (isTProject(arg)) {
    return arg;
  }
  throw new Error('Invalid TProject');
}
export function isTProjectCreateDTO(arg: any): arg is TProjectCreateDTO {
  return true;
}
export function isTProjectUpdateDTO(arg: any): arg is TProjectUpdateDTO {
  return arg && arg._id;
}
