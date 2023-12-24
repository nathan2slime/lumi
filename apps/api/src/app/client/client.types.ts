import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class ClientInput {
  @Field()
  number: number;
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
