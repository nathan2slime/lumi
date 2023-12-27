import { Bill, Client } from '@lumi/types';

export type TableBillProps = {
  data: Bill[];
  clients: Client[];
  initialClient: string;
};
