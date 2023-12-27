import { Bills, Client } from '@lumi/types';

import { getClient } from './lib/apollo-client';

import { FilterBill } from '@/components/filter-bill';
import { Chart } from '@/components/chart';

import { searchBillsService } from '@/services/bill.services';
import { searchClientsService } from '@/services/client.services';

import { styles } from './styles';

const Index = async () => {
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
      <FilterBill client={currentClient} bills={bills} clients={clients} />

      <div className={style.charts()}>
        <Chart label="Price (R$)" type="price" bills={bills} />
        <Chart label="Energy (kWh)" type="amount" bills={bills} />
      </div>
    </div>
  );
};

export default Index;
