import { UseFormReturn } from 'react-hook-form';

export type BillItemFormProps = {
  label: string;
  name: string;
  form: UseFormReturn<any, any, any>;
};
