import { IResponse } from '@/constants/types/BaseResponse.type';
import {
  IFmTrackingDetail,
  IFmTrackingList,
  IHctTracking,
} from '@/constants/types/trackingOrder.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

interface IParams {
  code: string;
}

export const hctTrackingOrderApi = ({ code }: IParams): Promise<IResponse<IHctTracking>> => {
  return http.post(APIS.HCT_TRACKING, null, {
    params: {
      code,
    },
  });
};

export const searchFmTrackingOrderApi = ({
  codes,
}: {
  codes: Array<string>;
}): Promise<IResponse<IFmTrackingList>> => {
  return http.post(APIS.FM_TRACKING_SEARCH, {
    codes,
  });
};

export const getDetailFmTrackingOrderApi = ({
  code,
}: IParams): Promise<IResponse<IFmTrackingDetail>> => {
  return http.get(APIS.FM_TRACKING_DETAIL, {
    params: {
      code,
    },
  });
};
