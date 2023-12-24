import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BillEntity, BillItemEntity } from '@lumi/database';
import { Repository, UpdateResult } from 'typeorm';
import { faker } from '@faker-js/faker/locale/en';

import { BillItemService } from '../bill_item.service';
import { BillItemInput, UpdateBillItemInput } from '../bill_item.types';

describe('BillItemService', () => {
  let billItemRepository: Repository<BillItemEntity>;
  let billItemService: BillItemService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BillItemService,
        {
          provide: getRepositoryToken(BillItemEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    billItemService = module.get<BillItemService>(BillItemService);
    billItemRepository = module.get<Repository<BillItemEntity>>(
      getRepositoryToken(BillItemEntity),
    );

    jest
      .spyOn(billItemRepository, 'save')
      .mockImplementation(async (value: unknown) => value as BillItemEntity);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(billItemRepository).toBeDefined();
    expect(billItemService).toBeDefined();
  });

  describe('create', () => {
    const newBillItem = {
      amount: faker.number.int(),
      price: faker.number.int(),
      unit_price: faker.number.int(),
    } as BillItemInput;
    const bill = {} as BillEntity;

    it('must create and return an invoice item', async () => {
      const res = await billItemService.create(newBillItem, bill);

      expect(billItemRepository.save).toHaveBeenCalledWith({
        ...newBillItem,
        bill,
      });
      expect(res).toMatchObject(newBillItem);
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest
        .spyOn(billItemRepository, 'save')
        .mockImplementation(
          async entity => new Error(error) as unknown as BillItemEntity,
        );

      const res = await billItemService.create(newBillItem, bill);

      expect(billItemRepository.save).toHaveBeenCalledWith({
        ...newBillItem,
        bill,
      });
      expect(new Error(error)).toMatchObject(res);
    });
  });

  describe('createGroup', () => {
    const newBillItem = {
      amount: faker.number.int(),
      price: faker.number.int(),
      unit_price: faker.number.int(),
    } as BillItemInput;

    it('must create a group of bill items and return them', async () => {
      const payload = [newBillItem, newBillItem];
      const bill = {} as BillEntity;

      const res = await billItemService.createGroup(payload, bill);

      expect(billItemRepository.save).toHaveBeenCalledTimes(payload.length);
      expect(res).toMatchObject(payload);
    });
  });

  describe('findById', () => {
    it('must return biil item by id', async () => {
      const id = expect.any(String);
      const billItem = {} as BillItemEntity;

      jest
        .spyOn(billItemRepository, 'findOneBy')
        .mockImplementation(async where => billItem);

      const res = await billItemService.findById(id);

      expect(billItemRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(billItemRepository.findOneBy).toHaveReturnedTimes(1);
      expect(res).toMatchObject(billItem);
    });

    it('should capture and return any error', async () => {
      const id = expect.any(String);
      const error = expect.any(String);

      jest
        .spyOn(billItemRepository, 'findOneBy')
        .mockImplementation(
          async where => new Error(error) as unknown as BillItemEntity,
        );

      const res = await billItemService.findById(id);

      expect(billItemRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(billItemRepository.findOneBy).toHaveReturnedTimes(1);
      expect(res).toMatchObject(new Error(error));
    });
  });

  describe('update', () => {
    const id = faker.number.int();
    const payload = {
      amount: faker.number.int(),
      price: faker.number.int(),
      unit_price: faker.number.int(),
      type: 'ENERGY',
    } as UpdateBillItemInput;

    it('must update and return updated bill item', async () => {
      jest
        .spyOn(billItemRepository, 'findOneBy')
        .mockImplementation(async where => payload as BillItemEntity);

      const res = await billItemService.update({ id, ...payload });

      expect(billItemRepository.update).toHaveBeenCalledWith({ id }, payload);
      expect(billItemRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(payload);
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest.spyOn(billItemService, 'findById').mockImplementation(async id => {
        return new Error(error) as unknown as BillItemEntity;
      });

      const res = await billItemService.update({ id, ...payload });

      expect(res).toMatchObject(new Error(error));
      expect(billItemRepository.update).toHaveBeenCalled();
      expect(billItemService.findById).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    const id = Math.random().toString();

    it('must remove bill item by id', async () => {
      jest
        .spyOn(billItemRepository, 'softDelete')
        .mockImplementation(async where => ({}) as UpdateResult);

      await billItemService.remove(id);

      expect(billItemRepository.softDelete).toHaveBeenCalledWith({ id });
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest
        .spyOn(billItemRepository, 'softDelete')
        .mockImplementation(
          async where => new Error(error) as unknown as UpdateResult,
        );

      const res = await billItemService.remove(id);

      expect(res).toBeUndefined();
      expect(billItemRepository.softDelete).toHaveBeenCalledWith({ id });
    });
  });
});
