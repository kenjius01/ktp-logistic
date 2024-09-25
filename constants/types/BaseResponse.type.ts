export interface IBaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  description: string;
  timestamp: number;
  data: T;
}

export interface IBaseResPaginate<T> {
  items: Array<T>;
  total?: number;
}

export interface IResponse<T> {
  code: number;
  message: string;
  result: T;
}
