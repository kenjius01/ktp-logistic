import { OPERATION_FILTER } from '@/constants/filters';
import { BaseRequest } from '@/constants/types';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const searchProvince = (body: BaseRequest) => {
  return http.post(APIS.SEARCH_PROVINCE, body);
};

export const searchDistrict = (body: BaseRequest) => {
  return http.post(APIS.SEARCH_DISTRICT, body);
};

export const searchDistrictByProvince = (province_code: string) => {
  return http.post(APIS.SEARCH_DISTRICT, {
    filters: [
      {
        name: 'province_code',
        value: province_code,
        operation: OPERATION_FILTER.EQ,
      },
    ],
    keyword: '',
    pageable: {
      page: 1,
      page_size: 50,
    },
  });
};
