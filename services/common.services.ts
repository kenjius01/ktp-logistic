import { BaseRequest } from '@/constants/types';
import { IBaseResPaginate, IResponse } from '@/constants/types/BaseResponse.type';
import {
  CompanyInfoType,
  IBannerRes,
  ICompanyPhotoRes,
  IFormContact,
  IntroduceType,
  PartnerType,
  WebConfigType,
} from '@/constants/types/common.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const searchBannersApi = (body: BaseRequest): Promise<IResponse<IBannerRes>> => {
  return http.post(APIS.SEARCH_BANNERS, body);
};

export const searchCompanyPhotoApi = (body: BaseRequest): Promise<IResponse<ICompanyPhotoRes>> => {
  return http.post(APIS.SEARCH_COMPANY_PHOTO, body);
};

export const postContactCompanyApi = (body: IFormContact): Promise<IResponse<IFormContact>> => {
  return http.post(APIS.POST_SIGNUP_CONTACT, body);
};

export const companyContactInfoApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<CompanyInfoType>>> => {
  return http.post(APIS.COMPANY_CONTACT_INFO, body);
};

export const searchWebConfigApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<WebConfigType>>> => {
  return http.post(APIS.SEARCH_WEB_CONFIG, body);
};

export const searchIntroducesApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<IntroduceType>>> => {
  return http.post(APIS.INTRODUCES, body);
};

export const searchPartnersApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<PartnerType>>> => {
  return http.post(APIS.SEARCH_PARTNER, body);
};

export const uploadFileApi = (file: File): Promise<IResponse<string>> => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  return http.post(APIS.UPLOAD_FILE, bodyFormData);
};
