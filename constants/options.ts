import { queryOptions } from '@tanstack/react-query';

import {
  companyContactInfoApi,
  searchBannersApi,
  searchIntroducesApi,
} from '@/services/common.services';
import { searchMassListApi } from '@/services/lookup.api';
import { getDetailNewsApi, searchCategoryNewsApi, searchNewsApi } from '@/services/news.api';

import { DEFAULT_FILTER } from './common';
import { OPERATION_FILTER } from './filters';
import {
  COMPANY_CONTACT_INFO_KEY,
  HOT_NEWS_KEY,
  KEY_QUERY,
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

export const detailNewsOptions = (id: string | number) =>
  queryOptions({
    queryKey: [KEY_QUERY.NEWS_DETAIL, id],
    queryFn: () => getDetailNewsApi(id),
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

export const introduceOptions = queryOptions({
  queryKey: [KEY_QUERY.INTRODUCE],
  queryFn: () => searchIntroducesApi(DEFAULT_FILTER),
});

// LOOKUP PAGE
export const massListOptions = queryOptions({
  queryKey: [KEY_QUERY.MASS_LIST],
  queryFn: () => searchMassListApi(DEFAULT_FILTER),
});
