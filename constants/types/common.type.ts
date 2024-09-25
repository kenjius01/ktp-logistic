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
