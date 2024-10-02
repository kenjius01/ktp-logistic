import React from 'react';

import { CategoryType } from '@/constants/types/news.type';
import { cn } from '@/lib/utils';

interface CategoryNewsProps {
  categories: CategoryType[];
  categoryId: number;
  onChangeCategory: (id: number) => void;
}
export const CategoryNews = ({ categories, categoryId, onChangeCategory }: CategoryNewsProps) => {
  return (
    <div className="rounded bg-gray-100 p-8">
      <div>
        <h6 className="pb-8 font-bold uppercase">danh mục tin tức</h6>
        <ul className="flex flex-col gap-4 font-bold">
          <li
            className={cn(
              'cursor-pointer border-l-[3px] border-primary pl-2 uppercase',
              categoryId === 0 ? 'border-mainColor text-mainColor' : '',
            )}
            onClick={() => onChangeCategory(0)}
          >
            Tất cả
          </li>
          {categories.map((item) => (
            <li
              className={cn(
                'cursor-pointer border-l-[3px] border-primary pl-2 uppercase',
                categoryId === item?.id ? 'border-mainColor text-mainColor' : '',
              )}
              key={item?.id}
              onClick={() => onChangeCategory(item?.id)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
