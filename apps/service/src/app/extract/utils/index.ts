import { DataField } from '../extract.types';

export const fields: DataField[] = [
  {
    name: 'energy_without_icms_value',
    data: {
      amount: {
        index: 22,
      },
      unit_price: {
        index: 17,
      },
      price: {
        index: 24,
      },
    },
  },
  {
    name: 'compensed_energy',
    data: {
      amount: {
        index: 22,
      },
      unit_price: {
        index: 17,
      },
      price: {
        index: 30,
      },
    },
  },
  {
    name: 'energy',
    data: {
      amount: { index: 16 },
      unit_price: { index: 17 },
      price: { index: 18 },
    },
  },
  {
    name: 'data',
    data: {
      total_price: {
        index: 131,
        regex: /([\d,]+)[\s%20]*$/,
      },
      client: {
        index: 118,
        regex: /[\s]*([\d]+)[^\d]*$/,
      },
      expiresIn: {
        regex: /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/,
        index: 131,
      },
    },
  },
];

export const fieldParserByRegex = (field: string, regex: RegExp): string => {
  const res = decodeURIComponent(field).match(regex);
  
  return res && res[1];
};
