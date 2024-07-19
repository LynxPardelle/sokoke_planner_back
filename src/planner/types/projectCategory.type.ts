import { TColor } from '@src/shared/types/color.type';
import { ObjectId } from 'mongoose';
import { TProjectSubCategory } from './projectSubCategory.type';

export type TProjectCategory = {
  _id: string;
  name: string;
  description: string;
  subCategories: (TProjectSubCategory | ObjectId | string)[];
  createdAt: Date;
  updatedAt: Date;
} & TColor;

export type TProjectCategoryCreateDTO = Partial<Omit<TProjectCategory, '_id'>>;
export type TProjectCategoryUpdateDTO = TProjectCategoryCreateDTO &
  Required<{ _id: string }>;
export function isTProjectCategory(arg: any): arg is TProjectCategory {
  return (
    arg !== 'undefined' &&
    arg._id !== 'undefined' &&
    arg.name !== 'undefined' &&
    arg.description !== 'undefined' &&
    arg.subCategories !== 'undefined' &&
    arg.createdAt !== 'undefined' &&
    arg.updatedAt !== 'undefined'
  );
}
export function isTProjectCategoryArray(arg: any): arg is TProjectCategory[] {
  return Array.isArray(arg) && arg.every((v) => isTProjectCategory(v));
}
export function asTProjectCategory(arg: any): TProjectCategory {
  if (isTProjectCategory(arg)) {
    return arg;
  }
  throw new Error('Invalid TProjectCategory');
}
export function isTProjectCategoryCreateDTO(
  arg: any,
): arg is TProjectCategoryCreateDTO {
  return true;
}
export function isTProjectCategoryUpdateDTO(
  arg: any,
): arg is TProjectCategoryUpdateDTO {
  return arg && arg._id;
}
