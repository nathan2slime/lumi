import { BillsQuery } from '@lumi/types';

export type ChartProps = {
  label: string;
  type: 'price' | 'amount'
  bills: BillsQuery['Bills'];
};
