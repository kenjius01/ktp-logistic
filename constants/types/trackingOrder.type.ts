import { DateType } from './date.type';

export interface IHctTracking {
  data: {
    direct_trackings: Array<IHctDirectTracking>;
    slugs: Array<string>;
  };
}

export interface IHctCheckpoint {
  slug: string;
  created_at: DateType;
  message: string;
  status: string;
  date_time: DateType;
  address: {
    country: string;
    raw_location: string;
    standardized_country_region: {
      name: string;
      code: string;
    };
    standardized_coordinates: {
      latitude: number;
      longitude: number;
    };
    standardized_timezone: string;
    place_id: string;
  };
}

export interface IHctDirectTracking {
  id: number;
  tracking: {
    id: number;
    checkpoints: Array<IHctCheckpoint>;
    slug: string;
    tracking_number: string;
  };
  slug: string;
  tracking_number: string;
  is_instant_track: false;
}

//FM tracking

export interface IFmTrackingItem {
  ec_order_no: string;
  order_no: string;
  order_message?: string;
}
export interface IFmTrackingList {
  error_code: string;
  error_message: string;
  list: Array<IFmTrackingItem>;
}

export interface IFmTracking {
  send_store_address: string;
  order_no: string;
  order_date: string;
  order_time: string;
  order_date_rtn: string;
  order_date_r: string;
  parentid: string;
  send_store_phone: string;
  rcv_store_phone: string;
  ec_order_no: string;
  order_status: string;
  status_d: string;
  send_store_name: string;
  rcv_store_name: string;
  rcv_store_address: string;
}

export interface IFmTrackingDetail {
  error_code: string;
  error_message: string;
  list: Array<IFmTracking>;
}
