export interface IPageAble {
  page?: number;
  page_size: number;
}
export type BaseRequest = {
  keyword: string;
  filters: Record<string, unknown>[];
  pageable: IPageAble;
};
