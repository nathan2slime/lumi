import { Field, InputType, ObjectType } from 'type-graphql';

import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
@InputType()
export class Client extends BaseModel {
  @Field()
  number: number;

  @Field()
  installation: number;

  @Field(() => User)
  user: User;

  @Field({ nullable: true })
  address: string;
}
