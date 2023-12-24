import { Field, InputType, ObjectType } from 'type-graphql';

import { BaseModel } from './base.model';
import { Client } from './client.model';
import { BillItem } from './bill_item.model';

@ObjectType()
@InputType()
export class Bill extends BaseModel {
  @Field()
  total_price: number;

  @Field(() => Client)
  client: Client;

  @Field(() => [BillItem], { defaultValue: [] })
  items: BillItem[];

  @Field()
  due_date: Date;

  @Field()
  moth: number;

  @Field()
  file: string;
}
