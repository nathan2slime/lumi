'use client';

import { Bill } from '@lumi/types';

import { ComboboxItem, ComboboxPopover } from '../ui/combobox';

import { searchBillsService } from '@/services/bill.services';
import { useStatState } from '@/store/stat';

import { FilterBillProps } from './model';
import { styles } from './styles';

export const FilterBill = ({ clients = [], client }: FilterBillProps) => {
  const initialClient = client && {
    label: client,
    value: client,
  };

  const billState = useStatState();
  const style = styles();

  const comboboxData = clients.map(e => ({ label: e.number, value: e.number }));
  const currentClient = billState.client
    ? {
        label: billState.client,
        value: billState.client,
      }
    : initialClient;

  const onChange = async (e: ComboboxItem) => {
    billState.setClient(e.value);

    const res = await searchBillsService({
      data: { limit: 12, client: e.value, page: 1 },
    });

    if (res) {
      const { items, meta } = res.Bills;

      billState.setBill({ items: items as Bill[], meta });
    }
  };

  return (
    <div className={style.wrapper()}>
      <h2 className={style.title()}>Stats</h2>

      {currentClient && (
        <ComboboxPopover
          data={comboboxData}
          value={currentClient}
          placeholder="Search client"
          label="Set client"
          onChange={e => e && onChange(e)}
        />
      )}
    </div>
  );
};
