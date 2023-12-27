import { create } from 'zustand';
import { Bill, Bills, Client, Paginate } from '@lumi/types';

export type BillState = {
  client?: string;
  items: Bill[];
  meta?: Paginate;
  clients: Client[];
  setClients: (clients: Client[]) => void;
  setBill: (bill: Bills) => void;
  setClient: (client: string) => void;
};

export const useBillState = create<BillState>()(set => ({
  clients: [],
  items: [],
  setClients: (clients: Client[]) => set(state => ({ ...state, clients })),
  setBill: bills =>
    set(state => ({ ...state, items: bills.items, meta: bills.meta })),
  setClient: client =>
    set(state => {
      state.client = client;

      return state;
    }),
}));
