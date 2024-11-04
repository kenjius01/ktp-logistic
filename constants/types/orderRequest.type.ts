import { DateType } from './date.type';

export type TOrderRequestForm = {
  full_name: string;
  phone_number: string;
  address: string;
  time: string;
  total_packages: string | number;
  content: string;
  image_url: string[];
};

export type TOrderRequestRes = {
  id: number | string;
  full_name: string;
  phone_number: string;
  address: string;
  time: string;
  total_packages: string | number;
  content: string;
  image_url: string[];
  created_at: DateType;
  status: string;
};

export type TShippingRegulation = {
  id: number | string;
  image_url: string;
  content: string;
  title: string;
};

export type TReasonCancel = {
  id: number | string;
  order_id: number | string;
  reason: string;
};

export type TOrderInfo = {
  id: number | string;
  full_name: string;
  phone_number: string;
  address: string;
  time: string;
  total_packages: number;
  content: string;
  image_url: Array<string>;
  created_at: string;
  status: string;
  reason_cancel: TReasonCancel;
};
