import { Bills, Client } from '@lumi/types';

import { TableBill } from '@/components/table-bill';

import { searchClientsService } from '@/services/client.services';
import { searchBillsService } from '@/services/bill.services';

import { getClient } from '../lib/apollo-client';

import { styles } from './styles';

const Bills = async () => {
  const client = getClient();
  const style = styles();

  const clientsResponse = await searchClientsService({
    client,
    data: { page: 1, limit: 30, number: '' },
  });

  const clients = (clientsResponse &&
    clientsResponse.Clients.items) as unknown as Client[];

  const currentClient = (clients &&
    clients.length > 0 &&
    clients[0].number) as string;

  const billsResponse =
    currentClient &&
    (await searchBillsService({
      client,
      data: {
        client: currentClient,
        limit: 20,
        page: 1,
      },
    }));

  const bills = (billsResponse && billsResponse.Bills) as Bills;

  return (
    <div className={style.wrapper()}>
      <TableBill
        initialClient={currentClient}
        clients={clients}
        data={bills?.items}
      />
    </div>
  );
};

export default Bills;
