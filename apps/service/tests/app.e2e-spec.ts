import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/parser (POST)', () => {
    it('must return the information extracted from the PDF', async () => {
      const response = await request(app.getHttpServer())
        .post('/parser')
        .send({ filename: '321321903821.pdf' });

      expect(response.body).toHaveProperty('energy_without_icms_value');
      expect(response.body).toHaveProperty('compensed_energy');
      expect(response.body).toHaveProperty('energy');
      expect(response.body).toHaveProperty('data');
    });

    it('should error if PDF not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/parser')
        .send({ filename: expect.anything() });

        const { status, message } = response.body;
      
        expect(status).toEqual(404);
        expect(message).toEqual('file not found');
    });
  });
});
