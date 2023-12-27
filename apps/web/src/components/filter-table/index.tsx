'use client';

import { Bill } from '@lumi/types';

import { ComboboxItem, ComboboxPopover } from '../ui/combobox';

import { useBillState } from '@/store/bill';

import { searchBillsService } from '@/services/bill.services';

import { FilterTableProps } from './model';
import { styles } from './styles';

export const FilterTable = ({}: FilterTableProps) => {
  const billState = useBillState();

  const style = styles();
  const currentClient = {
    label: billState.client,
    value: billState.client,
  };

  const comboboxData = billState.clients.map(e => ({
    label: e.number,
    value: e.number,
  }));

  const onFilterTable = async (e: ComboboxItem) => {
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
    <div className={style.header()}>
      <h2 className={style.title()}>Bills</h2>

      {billState?.client && (
        <ComboboxPopover
          data={comboboxData}
          value={currentClient as ComboboxItem}
          placeholder="Search client"
          label="Set client"
          onChange={e => e && onFilterTable(e)}
        />
      )}
    </div>
  );
};
