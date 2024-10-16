import { BaseRequest } from '@/constants/types';
import { IBaseResPaginate, IResponse } from '@/constants/types/BaseResponse.type';
import { TOrderRequestForm, TShippingRegulation } from '@/constants/types/orderRequest.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const orderRequestAuthApi = (body: TOrderRequestForm) => {
  return http.post(APIS.ORDER_REQUEST_AUTH, body);
};

export const orderRequestPublicApi = (body: TOrderRequestForm) => {
  return http.post(APIS.ORDER_REQUEST_PUBLIC, body);
};

export const shippingRegulationApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<TShippingRegulation>>> => {
  return http.post(APIS.SHIPPING_REGULATION, body);
};
