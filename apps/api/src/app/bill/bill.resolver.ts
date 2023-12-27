import { Injectable } from '@nestjs/common';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { PermissionEnum } from '@lumi/database';

import { BillService } from './bill.service';

import { BillInput, Bills, SearchBillInput } from './bill.types';
import { ContextDataType } from '../../guard/types';
import { Bill } from '../../models/bill.model';

@Injectable()
@Resolver()
export class BillResolver {
  constructor(private readonly billService: BillService) {}

  @Authorized(PermissionEnum.ADMINISTRATOR)
  @Mutation(() => Bill, { name: 'CreateBill' })
  async create(@Ctx() ctx: ContextDataType, @Arg('data') data: BillInput) {
    return await this.billService.create(data, ctx.token);
  }

  @Query(() => Bills, { name: 'Bills' })
  async search(@Arg('data') data: SearchBillInput) {
    return await this.billService.search(data);
  }
}
