import { format, getTime, isAfter, isBefore, isValid, parse } from 'date-fns';
import { vi } from 'date-fns/locale';

import { DATE_FORMAT } from '@/constants/date';
import { DateType } from '@/constants/types/date.type';

const defaultFormatDay = 'YYYY-MM-DD';
const defaultFormat = 'YYYY-MM';
export const formatDateFn = (date: DateType, formatStr = DATE_FORMAT.DATE) => {
  if (!date) {
    return '';
  }
  const parsedDate = isValid(new Date(date))
    ? new Date(date)
    : parse(String(date), formatStr, new Date());
  return isValid(parsedDate) ? format(parsedDate, formatStr, { locale: vi }) : '';
};

export const getDateIso = (date?: DateType) => {
  const parsedDate = parse(String(date), defaultFormatDay, new Date());
  if (isValid(parsedDate)) {
    return parsedDate;
  }
  return;
};

export const getTimeStamp = (date?: DateType) => {
  const parsedDate = parse(String(date), defaultFormatDay, new Date());
  return isValid(parsedDate) ? getTime(parsedDate) : null;
};

export const isDayBefore = (dayCompare?: DateType, dayToCompare?: DateType, unit?: string) => {
  const parsedDayCompare = parse(String(dayCompare), unit || defaultFormatDay, new Date());
  const parsedDayToCompare = parse(String(dayToCompare), unit || defaultFormatDay, new Date());
  return isBefore(parsedDayCompare, parsedDayToCompare);
};

export const isDayAfter = (dayCompare?: DateType, dayToCompare?: DateType, unit?: string) => {
  const parsedDayCompare = parse(String(dayCompare), unit || defaultFormatDay, new Date());
  const parsedDayToCompare = parse(String(dayToCompare), unit || defaultFormatDay, new Date());
  return isAfter(parsedDayCompare, parsedDayToCompare);
};

export const getCurrentMonthYear = (formatStr = defaultFormat) => {
  return format(new Date(), formatStr, { locale: vi });
};
