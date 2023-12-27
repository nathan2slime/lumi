import { Field, InputType, ObjectType } from 'type-graphql';

import { Client } from '../../models/client.model';
import { Paginate, PaginateInput } from '../../app/app.types';

@ObjectType()
@InputType()
export class ClientInput {
  @Field()
  number: string;
}

@ObjectType()
@InputType()
export class UpdateClientInput extends ClientInput {
  @Field() id: string;

  @Field({ nullable: true })
  installation: number;

  @Field({ nullable: true })
  address: string;
}

@ObjectType()
@InputType()
export class Clients {
  @Field(() => [Client], { defaultValue: [] })
  items: Client[];

  @Field(() => Paginate)
  meta: Paginate;
}

@ObjectType()
@InputType()
export class SearchClientInput extends PaginateInput {
  @Field(() => String)
  number: string;
}

