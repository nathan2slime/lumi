import { Field, InputType, ObjectType } from 'type-graphql';

import { Client } from './client.model';
import { Token } from './token.model';
import { Role } from './role.model';
import { BaseModel } from './base.model';

@ObjectType()
@InputType()
export class User extends BaseModel {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field(() => [Role], { defaultValue: [], nullable: true })
  roles: Role[];

  @Field(() => [Token], { defaultValue: [] })
  tokens: Token[];

  @Field(() => [Client], { defaultValue: [], nullable: true })
  clients: Client[];
}
