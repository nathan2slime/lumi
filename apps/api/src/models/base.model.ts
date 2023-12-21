import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class BaseModel {
  @Field()
  id: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field({ nullable: true })
  deleted_at: Date;
}
