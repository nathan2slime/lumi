'use client';

import { Bills, Client } from '@lumi/types';
import { useEffect } from 'react';

import { FilterBill } from '@/components/filter-bill';
import { Chart } from '@/components/chart';

import { searchBillsService } from '@/services/bill.services';
import { searchClientsService } from '@/services/client.services';
import { useStatState } from '@/store/stat';

import { styles } from './styles';

const Index = () => {
  const style = styles();
  const statState = useStatState();

  const onLoadBills = async () => {
    const clientsResponse = await searchClientsService({
      data: { page: 1, limit: 30, number: '' },
    });

    const clients = (clientsResponse &&
      clientsResponse.Clients.items) as unknown as Client[];

    if (!!clients) {
      statState.setClients(clients);

      const currentClient = (clients?.length > 0 &&
        clients[0].number) as string;

      const billsResponse =
        currentClient &&
        (await searchBillsService({
          data: {
            client: currentClient,
            limit: 20,
            page: 1,
          },
        }));

      const bills = (billsResponse && billsResponse.Bills) as Bills;

      statState.setClient(currentClient);
      statState.setBill(bills);
    }
  };

  useEffect(() => {
    onLoadBills();
  }, []);

  return (
    <div className={style.wrapper()}>
      <FilterBill />

      <div className={style.charts()}>
        <Chart label="Price (R$)" type="price" />
        <Chart label="Energy (kWh)" type="amount" />
      </div>
    </div>
  );
};

export default Index;
