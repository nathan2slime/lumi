import { Field, Float, InputType, ObjectType } from 'type-graphql';

import { BillItemInput } from '../bill_item/bill_item.types';

@ObjectType()
@InputType()
export class BillInput {
  @Field(() => Float)
  total_price: number;

  @Field()
  client: string;

  @Field(() => [BillItemInput], { defaultValue: [] })
  items: BillItemInput[];

  @Field()
  due_date: Date;

  @Field({ nullable: true })
  public_lighting_contribution: number;

  @Field()
  date: Date;

  @Field()
  file: string;
}
