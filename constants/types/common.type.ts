import { DateType } from './date.type';

export type BannerType = {
  id: number;
  name: string;
  link: string;
  created_at: string;
};

export interface IBannerRes {
  items: BannerType[];
  total?: number;
}

export type CompanyPhotoType = {
  id: number;
  link: string;
  created_at: string;
  title: string;
  action_page: boolean;
};
export interface ICompanyPhotoRes {
  items: CompanyPhotoType[];
  total?: number;
}

export interface IFormContact {
  full_name: string;
  content: string;
  phone_number: string;
  email: string;
  address: string;
}

export type FormContactType = {
  id: number;
  full_name: string;
  content: string;
  phone_number: string;
  email: string;
  created_at: string;
  address: string;
  is_read: boolean;
};

export type CompanyInfoType = {
  id: number;
  email: string;
  phone_number: string;
  address: string;
  created_at: DateType;
};

export type WebConfigType = {
  id: number;
  link_web: string;
  avatar_url: string;
  created_at: DateType;
  name: string;
};

export type IntroduceItemType = {
  title: string;
  content: string;
  image_url?: string;
};

export type IntroduceType = {
  id: number;
  title: string;
  content: string;
  cover_url: string;
  info_vision: IntroduceItemType[];
  info_mission: IntroduceItemType[];
  info_core_value: IntroduceItemType[];
  info_competitive: IntroduceItemType[];
  created_at: string;
};

export type PartnerType = {
  id: number;
  name: string;
  avatar_url?: string;
  created_at: DateType;
};
