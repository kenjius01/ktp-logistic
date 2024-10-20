import { IResponse } from '@/constants/types/BaseResponse.type';
import {
  AuthResponseType,
  FormUpdateProfileType,
  LoginFormType,
  RegisterFormType,
  UserType,
} from '@/constants/types/user.type';
import { http } from '@/lib/http';

import { APIS } from './api.services';

export const registerApi = (body: RegisterFormType): Promise<IResponse<UserType>> => {
  return http.post(APIS.REGISTER, body);
};

export const loginApi = (body: LoginFormType): Promise<IResponse<AuthResponseType>> => {
  return http.post(APIS.LOGIN, body);
};

export const getMeApi = (): Promise<IResponse<UserType>> => {
  return http.get(APIS.GET_ME);
};

export const refreshToken = (accessToken?: string): Promise<IResponse<AuthResponseType>> => {
  return http.post(APIS.REFRESH_TOKEN, null, {
    params: {
      accessToken, // long token
    },
  });
};

export const logoutApi = ({
  userId,
  accessToken,
}: {
  userId?: number;
  accessToken?: string | null;
}) => {
  return http.post(APIS.LOGOUT, null, {
    params: {
      userId,
      accessToken,
    },
  });
};

interface IFormChangePassword {
  current_password: string;
  new_password: string;
  re_password: string;
}
export const changePasswordApi = (body: IFormChangePassword): Promise<IResponse<unknown>> => {
  return http.post(APIS.CHANGE_PASSWORD, body);
};

export const updateProfileApi = (body: FormUpdateProfileType): Promise<IResponse<unknown>> => {
  return http.post(APIS.UPDATE_PROFILE, body);
};
