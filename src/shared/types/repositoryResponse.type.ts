export type TRepositoryResponse<T> = {
  message: string;
} & (
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: unknown;
    }
);
