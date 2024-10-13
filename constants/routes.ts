export const ROUTES = {
  HOME: '/',
  INTRODUCE: '/introduce',
  CONTACT: '/contact',
  NEWS: '/news',
  NEWS_DETAIL: (id?: string | number) => `/news/${id}`,
  LOOKUP: '/lookup',
  ORDER_REQUEST: '/order-request',
  LOGIN: '/login',
  REGISTER: '/register',
  TRACKING_ORDER: '/tracking-order',
  TRACKING_ORDER_TYPE: (type: string) => `/tracking-order/${type}`,
};
