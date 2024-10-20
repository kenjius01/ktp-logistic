export type NewsType = {
  id: number;
  title: string;
  content?: string;
  seo_id: string;
  cover_url: string;
  is_hot: boolean;
  created_at: string;
  category_new_id: number;
  category: CategoryType;
};

export type CategoryType = {
  id: number;
  name: string;
  created_at: string;
};
