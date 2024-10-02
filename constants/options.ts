import { queryOptions } from '@tanstack/react-query';

import { companyContactInfoApi, searchBannersApi } from '@/services/common.services';
import { searchCategoryNewsApi, searchNewsApi } from '@/services/news.api';

import { DEFAULT_FILTER } from './common';
import { OPERATION_FILTER } from './filters';
import {
  COMPANY_CONTACT_INFO_KEY,
  HOT_NEWS_KEY,
  SEARCH_BANNERS_KEY,
  SEARCH_CATEGORY_NEWS_KEY,
} from './keyQuery';

export const companyInfoOptions = queryOptions({
  queryKey: [COMPANY_CONTACT_INFO_KEY],
  queryFn: () => companyContactInfoApi(DEFAULT_FILTER),
});

export const bannerOptions = queryOptions({
  queryKey: [SEARCH_BANNERS_KEY],
  queryFn: () => searchBannersApi(DEFAULT_FILTER),
});

export const hotNewsOptions = queryOptions({
  queryKey: [HOT_NEWS_KEY],
  queryFn: () =>
    searchNewsApi({
      filters: [
        {
          name: 'is_hot',
          value: 'true',
          operation: OPERATION_FILTER.EQ,
        },
      ],
      keyword: '',
      pageable: {
        page: 1,
        page_size: 10,
      },
    }),
});

export const categoryNewsOptions = queryOptions({
  queryKey: [SEARCH_CATEGORY_NEWS_KEY],
  queryFn: () => searchCategoryNewsApi(DEFAULT_FILTER),
});
