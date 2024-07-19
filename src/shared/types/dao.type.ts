export type TDAO<C, S, U, R> = {
  create: (data: C) => Promise<R>;
  read: (id: string) => Promise<R>;
  readAll: (search: S) => Promise<R[]>;
  update: (data: U) => Promise<R>;
  delete: (id: string) => Promise<R>;
};
