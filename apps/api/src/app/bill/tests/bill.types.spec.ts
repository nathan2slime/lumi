import { plainToClass } from 'class-transformer';
import { faker } from '@faker-js/faker/locale/en';

import { BillInput } from '../bill.types';

describe('bill types', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('BillInput', () => {
    let data: BillInput;
    const payload = {
      total_price: faker.number.int(),
      items: [],
      client: faker.number.int(),
      date: faker.date.anytime(),
      due_date: faker.date.anytime(),
      file: faker.string.sample(),
    };

    beforeEach(() => {
      data = plainToClass(BillInput, payload);
    });

    it('should be defined', () => {
      expect(data).toBeDefined();
      expect(data.client).toBe(payload.client);
      expect(data.items).toMatchObject(payload.items);
      expect(data.due_date).toMatchObject(payload.due_date);
      expect(data.file).toBe(payload.file);
      expect(data.total_price).toBe(payload.total_price);
    });
  });
});
