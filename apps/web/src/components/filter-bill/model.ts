import { BillsQuery, Client } from '@lumi/types';

export type FilterBillProps = {
  clients?: Client[];
  client?: string;
  bills?: BillsQuery['Bills'];
};
