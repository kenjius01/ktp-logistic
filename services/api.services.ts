export const APIS = {
  REGISTER: '/api/v1/public/dang-ki-tai-khoan',
  LOGIN: '/api/v1/public/auth/login',
  GET_ME: '/api/v1/web/user/profile',
  REFRESH_TOKEN: '/api/v1/auth/refresh-token',
  LOGOUT: '/api/v1/auth/logout',
  UPLOAD_FILE: '/api/v1/public/ktp-upload',

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

  SEARCH_PROVINCE: '/api/v1/public/tinh-thanh/search',
  SEARCH_DISTRICT: '/api/v1/public/quan-huyen/search',

  //LOOKUP
  SEARCH_MASS_LIST: '/api/v1/public/khoi-luong/search',
  SEARCH_SHIPPING_SERVICE: '/api/v1/public/dich-vu-van-chuyen/search',
  LOOKUP_FEE_AND_TIME: '/api/v1/public/gia-cuoc/tra-cuu-gia-cuoc-va-thoi-gian-van-chuyen',

  //ORDER REQUEST
  ORDER_REQUEST_AUTH: '/api/v1/web/don-hang',
  ORDER_REQUEST_PUBLIC: '/api/v1/public/don-hang',
  SHIPPING_REGULATION: '/api/v1/public/quy-dinh-van-chuyen/search',
};
