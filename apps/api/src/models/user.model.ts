import { Field, InputType, ObjectType } from 'type-graphql';

import { Client } from './client.model';
import { Token } from './token.model';
import { Role } from './role.model';

@ObjectType()
@InputType()
export class User {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field(() => Role, { defaultValue: [] })
  roles: Role[];

  @Field(() => Token, { defaultValue: [] })
  tokens: Token[];

  @Field(() => Client, { defaultValue: [] })
  clients: Client[];
}
