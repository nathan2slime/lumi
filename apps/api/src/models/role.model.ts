import { Field, InputType, ObjectType } from 'type-graphql';

import { BaseModel } from './base.model';
import { Permission } from './permission.model';
import { User } from './user.model';

@ObjectType()
@InputType()
export class Role extends BaseModel {
  @Field()
  name: string;

  @Field(() => User)
  user: User;

  @Field(() => Permission, { defaultValue: []})
  permissions: Permission[];
}
