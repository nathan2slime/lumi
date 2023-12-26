'use client';

import { Separator } from '@/components/ui/separator';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { BillItemFormProps } from './model';
import { styles } from './styles';

export const BillItemForm = ({ form, label, name }: BillItemFormProps) => {
  const style = styles();

  return (
    <div className={style.wrapper()}>
      <p className={style.groupTitle()}>{label}</p>

      <Separator />
      <div className={style.group()}>
        <FormField
          control={form.control}
          name={`${name}.unit_price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`${name}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`${name}.amount`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
