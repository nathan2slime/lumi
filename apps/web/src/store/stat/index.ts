import { create } from 'zustand';
import { Bill, Bills, Client, Paginate } from '@lumi/types';

export type StatState = {
  client?: string;
  meta?: Paginate;
  items: Bill[];
  clients: Client[];
  setClients: (clients: Client[]) => void;
  setBill: (bill: Bills) => void;
  setClient: (client: string) => void;
};

export const useStatState = create<StatState>()(set => ({
  items: [],
  clients: [],
  setClients: clients => set(state => ({ ...state, clients })),
  setBill: bills =>
    set(state => ({ ...state, items: bills.items, meta: bills.meta })),
  setClient: client =>
    set(state => {
      state.client = client;

      return state;
    }),
}));
