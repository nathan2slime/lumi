export type BillItemDetailResponse = {
  amount: string;
  unit_price: string;
  price: string;
};

export type BillDataResponse = {
  total_price: string;
  client: string;
  due_date: string;
  public_lighting_contribution: string;
};

export type BillDetailResponse = {
  energy_without_icms_value: BillItemDetailResponse;
  compensed_energy: BillItemDetailResponse;
  energy: BillItemDetailResponse;
  data: BillDataResponse;
};

export type BillItemDetail = {
  amount: number;
  unit_price: number;
  price: number;
};

export type BillData = {
  total_price: number;
  client: string;
  public_lighting_contribution: number;
  due_date: Date;
  date: Date;
};

export type BillDetail = {
  energy_without_icms_value: BillItemDetail;
  compensed_energy: BillItemDetail;
  energy: BillItemDetail;
  data: BillData;
};
