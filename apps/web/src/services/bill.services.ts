import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { BillItemTypeEnum } from '@lumi/database/enums';
import { parse, subMonths } from 'date-fns';
import {
  BillInput,
  BillItemInput,
  BillsDocument,
  BillsQuery,
  BillsQueryVariables,
  CreateBillDocument,
  CreateBillMutation,
  CreateBillMutationVariables,
  SearchBillInput,
} from '@lumi/types';

import {
  BillDetailResponse,
  BillItemDetail,
  BillItemDetailResponse,
} from '@/types/bill_detail';
import graphql, { AppService } from '@/graphql';
import { storage } from '@/firebase';
import { api } from '@/api';
import { schemas } from '@/utils/forms/schemas';

export const hydrateBillItemDetail = (
  data: Record<string, BillItemDetailResponse>,
) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    (acc as Record<string, object>)[key] = schemas.itemBill.parse(
      value,
    ) as object;

    return acc;
  }, {});

export const hydrateBillDetailService = (
  { data, ...items }: BillDetailResponse,
  file: string,
) => {
  const due_date = (data.due_date &&
    parse(data.due_date, 'dd/MM/yyyy', new Date())) as Date;

  const date = (due_date && subMonths(due_date, 1)) as Date;

  const bill = {
    ...hydrateBillItemDetail(items),
    ...data,
    public_lighting_contribution: parseFloat(data.public_lighting_contribution),
    total_price: parseFloat(data.total_price),
    date,
    due_date,
    file,
  };

  return bill;
};

export const parseBillItemDetailService = (
  data: Record<string, BillItemDetail>,
): BillItemInput[] =>
  Object.entries(data).map(([key, value]) => {
    const item: BillItemInput = {
      ...value,
      type: key.toUpperCase() as BillItemTypeEnum,
    };

    return item;
  });

export const uploadBillFileService = async (
  file: File,
  id: string,
  onProgress: (progress: number) => void,
) =>
  new Promise<boolean>(async (resolve, reject) => {
    const storageRef = ref(storage, id);

    const res = uploadBytesResumable(storageRef, file, {
      contentType: 'application/pdf',
    });

    res.on(
      'state_changed',
      e => {
        const progress = (e.bytesTransferred / e.totalBytes) * 100;

        onProgress(progress);
      },
      () => reject(false),
      () => resolve(true),
    );
  });

export const getBillDetailService = async (value: string) => {
  const { status, data } = await api.post<BillDetailResponse>('/parser', {
    file_name: value,
  });

  if (status == 201) return data;
};

export const createNewBillService = async ({
  data,
  ...args
}: AppService<BillInput>) =>
  await graphql<CreateBillMutation, CreateBillMutationVariables>({
    ...args,
    query: CreateBillDocument,
    type: 'mutation',
    variables: {
      data,
    },
  });

export const searchBillsService = async ({
  data,
  ...args
}: AppService<SearchBillInput>) =>
  await graphql<BillsQuery, BillsQueryVariables>({
    ...args,
    query: BillsDocument,
    type: 'query',
    variables: {
      data,
    },
  });

export const downloadBillService = async (file: string, client: string) => {
  const storageRef = ref(storage, file);

  const res = await getDownloadURL(storageRef);

  window.open(res, '__blank');
};
