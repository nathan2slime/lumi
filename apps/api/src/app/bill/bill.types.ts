import { Field, InputType, ObjectType } from 'type-graphql';

import { BillItemInput } from '../bill_item/bill_item.types';

@ObjectType()
@InputType()
export class BillInput {
  @Field()
  total_price: number;

  @Field()
  client: number;

  @Field(() => [BillItemInput], { defaultValue: [] })
  items: BillItemInput[];

  @Field()
  due_date: Date;

  @Field()
  moth: number;

  @Field()
  file: string;
}
