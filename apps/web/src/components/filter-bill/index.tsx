'use client';

import { Bill } from '@lumi/types';

import { ComboboxItem, ComboboxPopover } from '../ui/combobox';

import { searchBillsService } from '@/services/bill.services';
import { useStatState } from '@/store/stat';

import { FilterBillProps } from './model';
import { styles } from './styles';

export const FilterBill = ({}: FilterBillProps) => {
  const statState = useStatState();
  const style = styles();

  const initialClient = statState.client && {
    label: statState.client,
    value: statState.client,
  };
  const comboboxData = statState.clients.map(e => ({
    label: e.number,
    value: e.number,
  }));
  const currentClient = statState.client
    ? {
        label: statState.client,
        value: statState.client,
      }
    : initialClient;

  const onChange = async (e: ComboboxItem) => {
    statState.setClient(e.value);

    const res = await searchBillsService({
      data: { limit: 12, client: e.value, page: 1 },
    });

    if (res) {
      const { items, meta } = res.Bills;

      statState.setBill({ items: items as Bill[], meta });
    }
  };

  return (
    <div className={style.wrapper()}>
      <h2 className={style.title()}>Stats</h2>

      {statState?.client && (
        <ComboboxPopover
          data={comboboxData}
          value={currentClient as ComboboxItem}
          placeholder="Search client"
          label="Set client"
          onChange={e => e && onChange(e)}
        />
      )}
    </div>
  );
};
