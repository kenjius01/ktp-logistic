import { BaseRequest } from '@/constants/types';
import { IBaseResPaginate, IResponse } from '@/constants/types/BaseResponse.type';
import { DateType } from '@/constants/types/date.type';
import { LookupFormType, LookupResponseType, MassListType } from '@/constants/types/lookup.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const searchMassListApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<MassListType>>> => {
  return http.post(APIS.SEARCH_MASS_LIST, body);
};

interface ISerive {
  id?: number | string;
  name?: string;
  created_at: DateType;
}

export const searchShippingServiceApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<ISerive>>> => {
  return http.post(APIS.SEARCH_SHIPPING_SERVICE, body);
};

export const lookupFeeAndTimeApi = (
  body: LookupFormType,
): Promise<IResponse<LookupResponseType>> => {
  return http.post(APIS.LOOKUP_FEE_AND_TIME, body);
};
