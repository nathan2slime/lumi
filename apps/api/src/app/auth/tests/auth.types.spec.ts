import { faker } from '@faker-js/faker/locale/en';
import { transformAndValidate } from 'class-transformer-validator';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';

import { AuthToken, SignInInput, SignUpInput } from '../auth.types';

describe('auth types', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('SignUpInput', () => {
    let payload: SignUpInput;

    beforeEach(() => {
      payload = {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
    });

    it('should be defined', async () => {
      const data = plainToClass(SignUpInput, payload);

      expect(data.name).toBe(payload.name);
      expect(data.surname).toBe(payload.surname);
      expect(data.email).toBe(payload.email);
      expect(data.password).toBe(payload.password);
    });

    it('should return an error if the email is invalid', async () => {
      payload.email = faker.string.alpha();

      try {
        await transformAndValidate(SignUpInput, payload);

        expect(false).toBe(true);
      } catch (error) {
        const err = error as ValidationError[];

        expect(err.length).toBe(1);
        expect(err[0].property).toBe('email');
      }
    });

    it('should return an error if the password is invalid', async () => {
      payload.password = faker.string.alpha();

      try {
        await transformAndValidate(SignUpInput, payload);

        expect(false).toBe(true);
      } catch (error) {
        const err = error as ValidationError[];

        expect(err.length).toBe(1);
        expect(err[0].property).toBe('password');
      }
    });
  });

  describe('SignInInput', () => {
    const payload = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    it('should be defined', async () => {
      const data = plainToClass(SignInInput, payload);

      expect(data.email).toBe(payload.email);
      expect(data.password).toBe(payload.password);
    });

    it('should return an error if the email is invalid', async () => {
      payload.email = faker.string.alpha();

      try {
        await transformAndValidate(SignInInput, payload);

        expect(false).toBe(true);
      } catch (error) {
        const err = error as ValidationError[];

        expect(err.length).toBe(1);
        expect(err[0].property).toBe('email');
      }
    });
  });

  describe('AuthToken', () => {
    const payload = {
      user: faker.number.int().toString(),
    };

    it('should be defined', async () => {
      const data = plainToClass(AuthToken, payload);

      expect(data.user).toBe(payload.user);
    });
  });
});
