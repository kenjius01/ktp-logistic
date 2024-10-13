import { TOrderRequestForm } from '@/constants/types/orderRequest.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const orderRequestAuthApi = (body: TOrderRequestForm) => {
  return http.post(APIS.ORDER_REQUEST_AUTH, body);
};

export const orderRequestPublicApi = (body: TOrderRequestForm) => {
  return http.post(APIS.ORDER_REQUEST_PUBLIC, body);
};
