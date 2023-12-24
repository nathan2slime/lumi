import { plainToClass } from 'class-transformer';
import { faker } from '@faker-js/faker/locale/en';

import { ClientInput, UpdateClientInput } from '../client.types';

describe('client types', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('ClientInput', () => {
    let data: ClientInput;
    const payload = {
      number: faker.number.int(),
    };

    beforeEach(() => {
      data = plainToClass(ClientInput, payload);
    });

    it('should be defined', () => {
      expect(data).toBeDefined();
      expect(data.number).toBe(payload.number);
    });
  });

  describe('UpdateClientInput', () => {
    let data: UpdateClientInput;
    const payload = {
      id: faker.number.int(),
      number: faker.number.int(),
      installation: faker.number.int(),
      address: faker.location.streetAddress(),
    };

    beforeEach(() => {
      data = plainToClass(UpdateClientInput, payload);
    });

    it('should be defined', () => {
      expect(data).toBeDefined();
      expect(data.id).toBe(payload.id);
      expect(data.number).toBe(payload.number);
      expect(data.installation).toBe(payload.installation);
      expect(data.address).toBe(payload.address);
    });
  });
});
