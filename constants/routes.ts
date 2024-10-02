export const ROUTES = {
  HOME: '/',
  INTRODUCE: '/introduce',
  CONTACT: '/contact',
  NEWS: '/news',
  NEWS_DETAIL: (id?: string | number) => `/news/${id}`,
  LOOKUP: '/lookup',
  ORDER_REQUEST: '/order-request',
};
