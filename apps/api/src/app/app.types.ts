import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Paginate {
  @Field(() => Number, { nullable: true })
  totalItems?: number;

  @Field(() => Number)
  itemCount: number;

  @Field(() => Number)
  itemsPerPage: number;

  @Field(() => Number, { nullable: true })
  totalPages?: number;

  @Field(() => Number)
  currentPage: number;
}

@InputType()
@ObjectType()
export class PaginateInput {
  @Field(() => Number)
  limit: number;

  @Field(() => Number)
  page: number;
}

@ObjectType()
export class Success {
  @Field(() => Boolean)
  success: boolean;
}
