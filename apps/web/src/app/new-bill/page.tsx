'use client';

import toast from 'react-hot-toast';
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BillInput } from '@lumi/types';
import { TokenEnum } from '@lumi/database/enums';

import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DatePicker } from '@/components/ui/date-picker';
import { BillItemForm } from '@/components/forms/bill-item';
import { Button } from '@/components/ui/button';

import { schemas } from '@/utils/forms/schemas';
import { BillDetailResponse } from '@/types/bill_detail';
import {
  createNewBillService,
  getBillDetailService,
  hydrateBillDetailService,
  parseBillItemDetailService,
  uploadBillFileService,
} from '@/services/bill.services';
import { getTokenByType } from '@/utils/funcs';
import { useAuthState } from '@/store/auth';

import { UploadBillProps } from './model';
import { styles } from './styles';

const NewBill = ({}: UploadBillProps) => {
  const [isReady, setIsReady] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuthState();

  const form = useForm<z.infer<typeof schemas.newBill>>({
    mode: 'all',
    resolver: zodResolver(schemas.newBill),
  });
  const style = styles();

  const {
    reset,
    formState: { isValid },
    getValues,
    trigger,
  } = form;

  const onUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const uuid = Math.random().toString();
    const files = e.target.files;
    setIsLoading(true);

    if (files) {
      if (files.length <= 0) return;
      const file = files[0];

      if (file.type == 'application/pdf') {
        const res = await uploadBillFileService(
          file,
          uuid,
          (progress: number) => setUploadProgress(progress),
        );

        if (res) {
          toast.success('Invoice upload done');

          const billDetail = await onGetDetails(uuid);
          if (billDetail) onParserBill(billDetail, uuid);

          setUploadProgress(0);
          setIsLoading(false);

          return;
        }

        toast.error('Failed to upload invoice');
      }
    }

    setIsLoading(false);
    e.target.value = '';
  }, []);

  const onGetDetails = useCallback(async (value: string) => {
    const details = await getBillDetailService(value);

    return details;
  }, []);

  const onParserBill = async (detail: BillDetailResponse, file: string) => {
    const res = hydrateBillDetailService(detail, file);

    reset({ ...res, file });
    trigger();
    setIsReady(true);
  };

  const onSubmit = async () => {
    const user = auth.data;

    if (isValid && user) {
      const {
        client,
        date,
        due_date,
        public_lighting_contribution,
        file,
        total_price,
        ...values
      } = schemas.newBill.parse(getValues());

      const payload: BillInput = {
        client,
        date,
        due_date,
        public_lighting_contribution,
        file,
        total_price,
        items: parseBillItemDetailService(values),
      };

      const tokens = user.tokens;
      const token = tokens && getTokenByType(tokens, TokenEnum.AUTHORIZATION);

      if (token) {
        setIsLoading(true);

        const loading = toast.loading('Loading');

        const res = await createNewBillService({
          data: payload,
          token: token.value,
        });
        
        toast.dismiss(loading);

        if (res) {
          setIsLoading(false);
          setIsReady(false);
          reset({});

          toast.success('New bill created');
        }
      }
    }
  };

  const onCancel = () => {
    reset();
    setIsReady(false);
  };

  return (
    <div className={style.wrapper()}>
      <Progress value={uploadProgress} className={style.progress()} />

      <Card className={style.form()}>
        <header className={style.header()}>
          <h3 className={style.title()}>New bill</h3>
        </header>

        <Separator />

        <div className={style.content()}>
          <FormItem>
            <Label>Bill</Label>
            <Input
              disabled={isLoading || isReady}
              type="file"
              onChange={onUpload}
            />
          </FormItem>

          {isReady && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={style.subform()}
              >
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total price</FormLabel>
                      <FormControl>
                        <Input placeholder="R$" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="public_lighting_contribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public lighting contribution</FormLabel>
                      <FormControl>
                        <Input placeholder="R$" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className={style.row()}>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due date</FormLabel>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <BillItemForm name="energy" label="Energy" form={form} />
                <BillItemForm
                  name="compensed_energy"
                  label="Compensed energy"
                  form={form}
                />
                <BillItemForm
                  name="energy_without_icms_value"
                  label="Energy without ICMS value"
                  form={form}
                />

                <div className={style.footer()}>
                  <Button
                    type="reset"
                    variant="outline"
                    className={style.submit()}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className={style.submit()}
                    disabled={!isValid}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NewBill;
