import { Field, Float, InputType, ObjectType } from 'type-graphql';
import { BillItemTypeEnum } from '@lumi/database';

import { BaseModel } from './base.model';
import { Bill } from './bill.model';

@ObjectType()
@InputType()
export class BillItem extends BaseModel {
  @Field(() => Float)
  amount: number;

  @Field(() => Float)
  unit_price: number;

  @Field(() => Float)
  price: number;

  @Field(() => Bill)
  bill: Bill;

  @Field()
  type: BillItemTypeEnum;
}
