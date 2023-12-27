import { Field, Float, InputType, ObjectType } from 'type-graphql';

import { BaseModel } from './base.model';
import { Client } from './client.model';
import { BillItem } from './bill_item.model';

@ObjectType()
@InputType()
export class Bill extends BaseModel {
  @Field(() => Float)
  total_price: number;

  @Field(() => Client)
  client: Client;

  @Field(() => [BillItem], { defaultValue: [] })
  items: BillItem[];

  @Field(() => Float, { nullable: true})
  public_lighting_contribution: number;

  @Field()
  due_date: Date;

  @Field()
  date: Date;

  @Field()
  file: string;
}
