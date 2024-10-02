import { BaseRequest } from '@/constants/types';
import { IBaseResPaginate, IResponse } from '@/constants/types/BaseResponse.type';
import { CategoryType, NewsType } from '@/constants/types/news.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const searchNewsApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<NewsType>>> => {
  return http.post(APIS.SEARCH_NEWS, body);
};

export const searchCategoryNewsApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<CategoryType>>> => {
  return http.post(APIS.SEARCH_CATEGORY_NEWS, body);
};
