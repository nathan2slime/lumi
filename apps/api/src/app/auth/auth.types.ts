import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class SignUpInput {
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  surname: string;

  @MinLength(6)
  @Field()
  password: string;
}

@ObjectType()
@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
@InputType()
export class AuthToken {
  @Field()
  user: string;
}
