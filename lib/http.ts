import Axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import { CODE_RESPONSE } from '@/constants/codeResponse';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers = config.headers ?? {};

  if (!config?.headers?.Authorization) {
    // const token = useTokensStore.getState().tokens?.access_token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //   config.headers.Authorization = '';
    // }
  }
  config.headers.set('Access-Control-Allow-Origin', '*');
  config.headers.set('Access-Control-Allow-Credentials', '*');
  config.headers.set('X-Requested-With', 'XMLHttpRequest');

  return config;
}
export const http = Axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

const onResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
  const { code } = response.data;

  //* Truong hop refresh token

  //* Cac TH con lai
  switch (code) {
    case 200:
      break;
    case CODE_RESPONSE.POST_SUCCESS:
      // useNotificationStore.getState().addNotification({
      //   type: 'success',
      //   description: response.data.message,
      // });
      break;
    case CODE_RESPONSE.POST_FAILUE:
      break;
    case CODE_RESPONSE.POST_GET_FAILUE: {
      // TODO: BE chưa rõ ràng lỗi trả về đâu nên tạm thời để như này
      // const message1 = response.data.data?.message;
      // const message2 = response?.data?.message;
      // const message = message1 === 'Thao tác không thành công' || !message1 ? message2 : message1;

      // useNotificationStore.getState().addNotification({
      //   type: 'error',
      //   description: message,
      // });
      break;
    }
    case CODE_RESPONSE.AUTHENTICATION_FAILED:
      // useNotificationStore.getState().addNotification({
      //   type: 'error',
      //   description: response.data.message,
      // });
      // handleLogout();
      break;
    default:
      break;
  }
  return response.data;
};

const onResponseError = async (error: AxiosError) => {
  // const code = error.response?.status;

  //* Truong hop refresh token

  // if (
  //   code === CODE_RESPONSE.NOT_AUTHORIZED ||
  //   (code === CODE_RESPONSE.SEVER_ERROR && !error.config.headers.Authorization)
  // ) {
  //   const long_token = useTokensStore.getState().tokens?.refresh_token;

  //   if (!long_token) {
  //     handleLogout(true);
  //     return Promise.reject(error);
  //   }
  //   try {
  //     if (error.config.headers.resend || error.config.url?.includes(refreshTokenApi)) {
  //       return Promise.reject(error);
  //     }
  //     error.config.headers.resend = true;

  //     const res = await refreshToken(long_token);
  //     const newToken = res?.data?.data.access_token;
  //     if (!newToken) {
  //       handleLogout(true);
  //       return Promise.reject(error);
  //     }
  //     useTokensStore.getState().addTokens(res?.data.data);
  //     error.config.headers.Authorization = 'Bearer ' + newToken;
  //     return await axios(error.config);
  //   } catch (error) {
  //     handleLogout(true);
  //     return Promise.reject(error);
  //   }
  // }

  //* cac truong hop con lai
  // const message = error?.response?.data?.message || error.message;
  // useNotificationStore.getState().addNotification({
  //   type: 'error',
  //   description: message,
  // });

  return Promise.reject(error);
};

http.interceptors.request.use(authRequestInterceptor);
http.interceptors.response.use(onResponse, onResponseError);
