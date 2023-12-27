import { Bill } from '@lumi/types';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { downloadBillService } from '@/services/bill.services';

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <div className="lowercase">{format(row.getValue('date'), 'MM/yy')}</div>
    ),
  },
  {
    accessorKey: 'due_date',
    header: 'Due date',
    cell: ({ row }) => (
      <div className="lowercase">
        {format(row.getValue('due_date'), 'dd/MM/yy')}
      </div>
    ),
  },
  {
    accessorKey: 'total_price',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const total_price = parseFloat(row.getValue('total_price'));

      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(total_price);

      return <div className="text-right pl-4 font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const bill = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => downloadBillService(bill.file, bill.client.number)}
            >
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
