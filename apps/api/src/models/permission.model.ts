import { PermissionEnum } from '@lumi/database';

import { Field, InputType, ObjectType } from 'type-graphql';
import { BaseModel } from './base.model';

@ObjectType()
@InputType()
export class Permission extends BaseModel {
  @Field()
  name: PermissionEnum;
}
