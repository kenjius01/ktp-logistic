export type NewsType = {
  id: number;
  title: string;
  content?: string;
  cover_url: string;
  is_hot: boolean;
  created_at: string;
  category_new_id: number;
};

export type CategoryType = {
  id: number;
  name: string;
  created_at: string;
};
