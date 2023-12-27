import { create } from 'zustand';
import { Bill, Bills, Paginate } from '@lumi/types';

export type BillState = {
  client?: string;
  items?: Bill[];
  meta?: Paginate;
  setBill: (bill: Bills) => void;
  setClient: (client: string) => void;
};

export const useBillState = create<BillState>()(set => ({
  setBill: bills =>
    set(state => ({ ...state, items: bills.items, meta: bills.meta })),
  setClient: client => set(state => ({ ...state, client })),
}));
