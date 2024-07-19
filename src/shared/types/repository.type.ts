import { TRepositoryResponse } from './repositoryResponse.type';

export type TRepository<S, T, R, RR, U, V, X, Z> = {
  create: (data: S, args?: T) => Promise<TRepositoryResponse<Z>>;
  read: (id: string, args?: R) => Promise<TRepositoryResponse<Z>>;
  readAll: (args?: RR) => Promise<TRepositoryResponse<Z[]>>;
  update: (data: U, args?: V) => Promise<TRepositoryResponse<Z>>;
  delete: (id: string, args?: X) => Promise<TRepositoryResponse<Z>>;
};
