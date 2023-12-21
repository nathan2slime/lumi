import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class SignUpInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  surname: string;

  @Field()
  password: string;
}
