import { BillEntity, BillItemEntity } from '@lumi/database';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logger } from '@lumi/log';

import { BillItemInput, UpdateBillItemInput } from './bill_item.types';

@Injectable()
export class BillItemService {
  constructor(
    @InjectRepository(BillItemEntity)
    private readonly billItemRepository: Repository<BillItemEntity>,
  ) {}

  async create(data: BillItemInput, bill: BillEntity) {
    try {
      logger.info('starting invoice item creation');
      const billItem = await this.billItemRepository.save({ ...data, bill });

      logger.info('invoice item created successfully', { data, bill: bill.id });
      return billItem;
    } catch (error) {
      logger.error('error creating invoice item', { data, error });

      throw error;
    }
  }

  async createGroup(data: BillItemInput[], bill: BillEntity) {
    logger.info('starting group operation execution', data);

    const billItens = await Promise.all(
      data.map(billItem => this.create(billItem, bill)),
    );
    logger.info('group operation completed');

    return billItens;
  }

  async findById(id: string) {
    try {
      logger.info('starting bill item search by id', { id });
      const billItem = await this.billItemRepository.findOneBy({ id });

      logger.info('bill item search by id completed', { id });

      return billItem;
    } catch (error) {
      logger.error('error when searching for invoice by id', { error });

      throw error;
    }
  }

  async update({ id, ...data }: UpdateBillItemInput) {
    try {
      logger.info('starting bill item update by id', { id });
      await this.billItemRepository.update({ id }, data);
      logger.info('bill item updated successfully');

      const billItem = await this.findById(id);

      return billItem;
    } catch (error) {
      logger.error('error when updating for bill item by id');

      throw error;
    }
  }

  async remove(id: string) {
    try {
      logger.info('starting bill item removal by id', { id });
      await this.billItemRepository.softDelete({ id });

      logger.info('bill item updated successfully');
    } catch (error) {
      logger.error('error when removing bill item by id');

      throw error;
    }
  }
}
