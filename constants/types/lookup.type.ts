import { DateType } from './date.type';

export type MassListType = {
  id: number | string;
  avatar_url: string;
  from: number;
  to: number;
  don_vi: string;
  created_at: '2024-08-24T18:04:54.209592';
};

export type LookupFormType = {
  service_id: number | string;
  khoi_luong_id: number | string;
  from_province_code: string;
  from_district_code: string;
  to_province_code: string;
  to_district_code: string;
};

export interface IService {
  id: number | string;
  name: string;
  created_at: DateType;
}

export interface IConfigPrice {
  service_transport_id: number | string;
  name: string;
  price_default: string;
  time_default: string;
}
export type LookupResponseType = {
  service_id: number | string;
  services_response: IService;
  khoi_luong_id: number | string;
  khoi_luong_response: MassListType;
  from_province_code: string;
  from_province: string;
  from_district_code: string;
  from_district: string;
  to_province_code: string;
  to_province: string;
  to_district_code: string;
  to_district: string;
  config_price: IConfigPrice[];
};
