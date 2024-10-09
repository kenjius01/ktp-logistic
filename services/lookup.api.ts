import { BaseRequest } from '@/constants/types';
import { IBaseResPaginate, IResponse } from '@/constants/types/BaseResponse.type';
import { MassListType } from '@/constants/types/lookup.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const searchMassListApi = (
  body: BaseRequest,
): Promise<IResponse<IBaseResPaginate<MassListType>>> => {
  return http.post(APIS.SEARCH_MASS_LIST, body);
};
