'use client';

import { Bills, Client } from '@lumi/types';
import { useEffect } from 'react';

import { TableBill } from '@/components/table-bill';
import { FilterTable } from '@/components/filter-table';

import { searchClientsService } from '@/services/client.services';
import { searchBillsService } from '@/services/bill.services';

import { useBillState } from '@/store/bill';

import { styles } from './styles';

const Bills = () => {
  const billState = useBillState();
  const style = styles();

  const onLoadBills = async () => {
    const clientsResponse = await searchClientsService({
      data: { page: 1, limit: 30, number: '' },
    });

    const clients = (clientsResponse &&
      clientsResponse.Clients.items) as unknown as Client[];

    if (!!clients) {
      billState.setClients(clients);

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

      billState.setClient(currentClient);
      billState.setBill(bills);
    }
  };

  useEffect(() => {
    onLoadBills();
  }, []);

  return (
    <div className={style.wrapper()}>
      <FilterTable />

      <TableBill />
    </div>
  );
};

export default Bills;
