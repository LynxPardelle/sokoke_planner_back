export type TUser = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserCreateDTO = Partial<Omit<TUser, '_id'>>;
export type TUserUpdateDTO = TUserCreateDTO & Required<{ _id: string }>;
export function isTUser(arg: any): arg is TUser {
  return (
    arg !== 'undefined' &&
    arg._id !== 'undefined' &&
    arg.name !== 'undefined' &&
    arg.lastName !== 'undefined' &&
    arg.email !== 'undefined' &&
    arg.phone !== 'undefined' &&
    arg.username !== 'undefined' &&
    arg.password !== 'undefined' &&
    arg.createdAt !== 'undefined' &&
    arg.updatedAt !== 'undefined'
  );
}
export function isTUserArray(arg: any): arg is TUser[] {
  return Array.isArray(arg) && arg.every((v) => isTUser(v));
}
export function asTUser(arg: any): TUser {
  if (isTUser(arg)) {
    return arg;
  }
  throw new Error('Invalid TUser');
}
export function isTUserCreateDTO(arg: any): arg is TUserCreateDTO {
  return true;
}
export function isTUserUpdateDTO(arg: any): arg is TUserUpdateDTO {
  return arg && arg._id;
}
