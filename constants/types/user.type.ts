import { DateType } from './date.type';

export type LoginFormType = {
  username: string;
  password: string;
  user_agent?: string;
  ip_address?: string;
};

export type AuthResponseType = {
  token: string;
  long_token: string;
  login_type: string;
};

export type UserType = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  email: string;
  address: string;
  date_of_birth: string;
  active: boolean;
  is_system: boolean;
  created_at: DateType;
  avatar_url: string;
};
