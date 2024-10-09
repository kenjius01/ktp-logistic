export const APIS = {
  LOGIN: '/api/v1/public/auth/login',
  GET_ME: '/api/v1/web/user/profile',
  REFRESH_TOKEN: '/api/v1/auth/refresh-token',
  LOGOUT: '/api/v1/auth/logout',

  SEARCH_BANNERS: '/api/v1/public/banner-quang-cao/search',
  SEARCH_COMPANY_PHOTO: '/api/v1/public/company-photo/search',
  POST_SIGNUP_CONTACT: '/api/v1/public/lien-he-doanh-nghiep',
  COMPANY_CONTACT_INFO: '/api/v1/public/thong-tin-lien-he/search',
  SEARCH_WEB_CONFIG: '/api/v1/public/web-config/search',
  INTRODUCES: '/api/v1/public/introduction/search',
  SEARCH_PARTNER: '/api/v1/public/doi-tac/search',

  SEARCH_NEWS: '/api/v1/public/tin-tuc/search',
  GET_DETAIL_NEWS: (id: number | string) => `/api/v1/public/tin-tuc/${id}`,
  SEARCH_CATEGORY_NEWS: '/api/v1/public/danh-muc-bai-viet/search',

  //LOOKUP
  SEARCH_MASS_LIST: '/api/v1/public/khoi-luong/search',
};
