import { Injectable } from '@nestjs/common';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { PermissionEnum } from '@lumi/database';

import { BillService } from './bill.service';

import { ContextDataType } from '../../guard/types';
import { Bill } from '../../models/bill.model';
import { BillInput } from './bill.types';

@Injectable()
@Resolver()
export class BillResolver {
  constructor(private readonly billService: BillService) {}

  @Authorized(PermissionEnum.ADMINISTRATOR)
  @Mutation(() => Bill, { name: 'CreateBill' })
  async create(@Ctx() ctx: ContextDataType, @Arg('data') data: BillInput) {
    return await this.billService.create(data, ctx.token);
  }

  @Query(() => [Bill], { name: 'Bills'})
  async find() {
    
  }
}
