import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthController } from '../health.controller';
import { HealthModule } from '../health.module';

describe('HealthModule', () => {
  let module: TestingModule;
  let healthController: HealthController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HealthModule, TerminusModule, HttpModule],
      controllers: [HealthController],
      providers: [],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
    expect(module).toBeDefined();
  });
});
