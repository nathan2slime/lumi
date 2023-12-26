import { Field, InputType, ObjectType } from 'type-graphql';

import { BaseModel } from './base.model';
import { User } from './user.model';
import { Bill } from './bill.model';

@ObjectType()
@InputType()
export class Client extends BaseModel {
  @Field()
  number: string;

  @Field({ nullable: true })
  installation: number;

  @Field(() => User)
  user: User;

  @Field({ nullable: true })
  address: string;

  @Field(() => [Bill], { defaultValue: [] })
  bills: Bill[];
}
