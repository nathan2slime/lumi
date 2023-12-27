import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { BillEntity } from '@lumi/database';
import { Repository } from 'typeorm';
import { logger } from '@lumi/log';

import { BillItemService } from '../bill_item/bill_item.service';
import { ClientService } from '../client/client.service';
import { AuthService } from '../auth/auth.service';

import { BillInput, SearchBillInput } from './bill.types';
import { PaginateInput } from 'app/app.types';

@Injectable()
export class BillService {
  constructor(
    private readonly billItemService: BillItemService,
    private readonly clientService: ClientService,
    private readonly authService: AuthService,

    @InjectRepository(BillEntity)
    private readonly billRepository: Repository<BillEntity>,
  ) {}

  async create(payload: BillInput, token: string) {
    try {
      const user = await this.authService.authorization(token);

      logger.info('authorization successful', { user: user.id });
      logger.info('getting customer for that invoice', { payload });

      const client = await this.clientService.create(
        {
          number: payload.client.trim(),
        },
        user,
      );

      const bill = await this.billRepository.save({
        client,
        total_price: payload.total_price,
        public_lighting_contribution: payload.public_lighting_contribution,
        due_date: payload.due_date,
        date: payload.date,
        file: payload.file,
      });

      logger.info('bill created successfully', { bill: bill.id });

      await this.billItemService.createGroup(payload.items, bill);

      logger.info('bill items created successfully');

      return await this.findById(bill.id);
    } catch (error) {
      logger.error('error creating bill', { error });
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const bill = await this.billRepository.findOne({
        where: { id },
        relations: { client: true, items: true },
      });

      logger.info('bill found by id', { id });

      return bill;
    } catch (error) {
      logger.error('error finding bill by id', { id, error });

      throw error;
    }
  }

  async search(data: SearchBillInput) {
    try {
      const { limit, page, client: title } = data;
      logger.info('starting invoice search', data);

      const res = await paginate(
        this.billRepository,
        { limit, page },
        {
          where: {
            client: { number: title },
          },
          relations: {
            client: true,
            items: true,
          },
        },
      );

      logger.info('finished invoice search', res.meta);
      return res;
    } catch (error) {
      logger.error('error in invoice search', { data, error });

      throw error;
    }
  }
}
