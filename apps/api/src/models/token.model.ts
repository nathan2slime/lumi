import { Field, InputType, ObjectType } from 'type-graphql';
import { TokenEnum } from '@lumi/database';

import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
@InputType()
export class Token extends BaseModel {
  @Field()
  value: string;

  @Field()
  type: TokenEnum;

  @Field(() => User)
  user: User;
}
