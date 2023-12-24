import { plainToClass } from 'class-transformer';
import { faker } from '@faker-js/faker/locale/en';

import { BillItemInput, UpdateBillItemInput } from '../bill_item.types';

describe('bill item types', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('BillItemInput', () => {
    let data: BillItemInput;
    const payload = {
      price: faker.number.int(),
      unit_price: faker.number.int(),
      amount: faker.number.int(),
      type: 'ENERGY',
    };

    beforeEach(() => {
      data = plainToClass(BillItemInput, payload);
    });

    it('should be defined', () => {
      expect(data).toBeDefined();
      expect(data.amount).toBe(payload.amount);
      expect(data.unit_price).toBe(payload.unit_price);
      expect(data.price).toBe(payload.price);
      expect(data.type).toBe(payload.type);
    });
  });

  describe('UpdateBillItemInput', () => {
    let data: UpdateBillItemInput;
    const payload = {
      id: faker.number.int(),
      price: faker.number.int(),
      unit_price: faker.number.int(),
      amount: faker.number.int(),
      type: 'ENERGY',
    };

    beforeEach(() => {
      data = plainToClass(UpdateBillItemInput, payload);
    });

    it('should be defined', () => {
      expect(data).toBeDefined();
      expect(data.id).toBe(payload.id);
      expect(data.amount).toBe(payload.amount);
      expect(data.unit_price).toBe(payload.unit_price);
      expect(data.price).toBe(payload.price);
      expect(data.type).toBe(payload.type);
    });
  });
});
