/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, isEqual, xorWith } from 'lodash';

import { UserType } from '@/constants/types/user.type';
const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

type ValueType = string | number;
type ObjectKeys = Record<string, any>;

export const generateUniqueID = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

export const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export function matchText(targetText: string, searchText: string) {
  if (!searchText || !targetText) {
    return false;
  }
  const targetTextNormal = removeAccents((targetText ?? '').toLowerCase()).trim();
  const searchTextNormal = removeAccents((searchText ?? '').toLowerCase()).trim();

  const tokens = searchTextNormal.split(' ');
  return !tokens.find((token) => !targetTextNormal.includes(token));
}

export const isArrayEqual = (x: unknown[], y: unknown[]) => isEmpty(xorWith(x, y, isEqual));

export const formatterCommaNumber = (value?: ValueType) => {
  if (value || value === 0) {
    return `${value}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
};

export const parserCommaNumber = (value?: string) => {
  if (!value) {
    return '';
  }
  return value.replace(/\$\s?|(,*)/g, '');
};

// Normalize value input string to number
export const normalizeToNumber = (value: unknown) => {
  const converNumber = Number(value);
  if (isNaN(converNumber) || converNumber === 0) {
    return null;
  }
  return converNumber;
};

// Check if boolean type
export function isBoolean(value: unknown) {
  return typeof value === 'boolean';
}

export const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const onPreventTypeLetterAndZero = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const { key } = event;
  const target = event.target as HTMLInputElement;
  if (
    (!allowedKeys.includes(key) && (key < '0' || key > '9')) ||
    (key === '0' && target.selectionStart === 0)
  ) {
    event.preventDefault();
  }
};

//check if all property f objects is undefined
export const isUndefinedObj = (obj: ObjectKeys) => {
  return Object.values(obj).every((value) => value === undefined);
};

//check if all property of object is null, undefined or empty
export const isNullUndefEmptyStrObj = (obj: ObjectKeys = {}) => {
  return Object.values(obj).every((value) => {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    return false;
  });
};

//Check if one property of object is null, undefined or empty
export const hasNullOrEmptyProperty = (obj: ObjectKeys = {}, keys?: string[]) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  if (keys) {
    return keys.some((key) => {
      const value = obj[key];
      return value === '' || value === null || value === undefined;
    });
  }
  return Object.values(obj).some((value) => value === '' || value === null || value === undefined);
};

// return positive number
export const getNonNegativeNumber = (value: unknown) => {
  if (typeof value === 'number' && !isNaN(value)) {
    return Math.max(0, value);
  }
  return 0;
};

export const getLastPathSegment = (path: string) => {
  const pathArray = path.split('/').filter((x) => x);
  return pathArray[pathArray.length - 1];
};

export const getFullName = (user: UserType): string => {
  return `${user?.last_name} ${user?.first_name}`.trim();
};

export const getInitialsName = (user: UserType): string => {
  const { first_name, last_name } = user;
  const firstInitial = first_name ? first_name.charAt(0).toUpperCase() : '';
  const lastInitial = last_name ? last_name.charAt(0).toUpperCase() : '';
  return `${lastInitial}${firstInitial}`;
};
