import { BillItemTypeEnum } from '@lumi/database';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class BillItemInput {
  @Field()
  amount: number;

  @Field()
  unit_price: number;

  @Field()
  price: number;

  @Field()
  type: BillItemTypeEnum;
}

@ObjectType()
@InputType()
export class UpdateBillItemInput extends BillItemInput {
  @Field() id: string;
}
