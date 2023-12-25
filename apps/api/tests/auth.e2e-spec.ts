import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { print } from 'graphql';
import {
  Mutation,
  SignInDocument,
  SignUpDocument,
  SignUpInput,
} from '@lumi/types';
import { faker } from '@faker-js/faker/locale/en';

import { AppModule } from '../src/app/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('SignIn', () => {
    let user: SignUpInput;

    beforeEach(async () => {
      user = {
        email: faker.internet.email().toLowerCase(),
        surname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: faker.internet.password(),
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(SignUpDocument),
          variables: {
            data: user,
          },
        });

      expect(res.status).toBe(200);
    });

    it('must log in and return user', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(SignInDocument),
          variables: {
            data: {
              email: user.email,
              password: user.password,
            },
          },
        });

      const data = res.body.data as Mutation;

      expect(res.status).toBe(200);
      expect(data.SignIn.email).toBe(user.email);
    });

    it('should return error when credentials are invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(SignInDocument),
          variables: {
            data: {
              email: user.email,
              password: faker.internet.password(),
            },
          },
        });

      const data = res.body;

      expect(res.status).toBe(200);
      expect(data.errors[0]).toMatchObject({ message: 'Invalid credentials' });
    });
  });

  describe('SignUp', () => {
    it('must create and return user', async () => {
      const user: object = {
        email: faker.internet.email().toLowerCase(),
        surname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: faker.internet.password(),
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(SignUpDocument),
          variables: {
            data: user,
          },
        });

      const data = res.body.data as Mutation;

      delete user['password'];

      expect(res.status).toBe(200);
      expect(data.SignUp).toMatchObject(user);
      expect(data.SignUp).toHaveProperty('tokens');
      expect(res.status).toBe(200);
    });
  });
});
