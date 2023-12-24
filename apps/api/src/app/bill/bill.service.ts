import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from '@lumi/database';
import { Repository } from 'typeorm';
import { logger } from '@lumi/log';

import { BillItemService } from '../bill_item/bill_item.service';
import { ClientService } from '../client/client.service';
import { AuthService } from '../auth/auth.service';

import { BillInput } from './bill.types';

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
          number: payload.client,
        },
        user,
      );

      const bill = await this.billRepository.save({
        client,
        total_price: payload.total_price,
        due_date: payload.due_date,
        moth: payload.moth,
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
}
