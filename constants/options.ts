import { queryOptions } from '@tanstack/react-query';

import { companyContactInfoApi, searchBannersApi } from '@/services/common.services';

import { DEFAULT_FILTER } from './common';
import { COMPANY_CONTACT_INFO_KEY, SEARCH_BANNERS_KEY } from './keyQuery';

export const companyInfoOptions = queryOptions({
  queryKey: [COMPANY_CONTACT_INFO_KEY],
  queryFn: () => companyContactInfoApi(DEFAULT_FILTER),
});

export const bannerOptions = queryOptions({
  queryKey: [SEARCH_BANNERS_KEY],
  queryFn: () => searchBannersApi(DEFAULT_FILTER),
});
