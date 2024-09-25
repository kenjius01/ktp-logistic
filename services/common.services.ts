import { BaseRequest } from '@/constants/types';
import { IResponse } from '@/constants/types/BaseResponse.type';
import { IBannerRes, ICompanyPhotoRes } from '@/constants/types/common.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const searchBannersApi = (body: BaseRequest): Promise<IResponse<IBannerRes>> => {
  return http.post(APIS.SEARCH_BANNERS, body);
};

export const searchCompanyPhotoApi = (body: BaseRequest): Promise<IResponse<ICompanyPhotoRes>> => {
  return http.post(APIS.SEARCH_COMPANY_PHOTO, body);
};
