import {
  DiskHealthIndicator,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { TestBed } from '@automock/jest';

import { HealthController } from '../health.controller';

describe('HealthModule', () => {
  let healthController: HealthController;
  let healthCheckService: HealthCheckService;
  let diskHealthIndicator: DiskHealthIndicator;
  let memoryHealthIndicator: MemoryHealthIndicator;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(HealthController).compile();

    healthController = unit;

    healthCheckService = unitRef.get<HealthCheckService>(HealthCheckService);
    diskHealthIndicator = unitRef.get<DiskHealthIndicator>(DiskHealthIndicator);
    memoryHealthIndicator = unitRef.get<MemoryHealthIndicator>(
      MemoryHealthIndicator,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  it('should be defined', () => {
    expect(module).toBeDefined();
    expect(healthController).toBeDefined();
    expect(diskHealthIndicator).toBeDefined();
    expect(memoryHealthIndicator).toBeDefined();
  });

  describe('check', () => {
    it('should return healthcheck information', async () => {
      const health: HealthCheckResult = {
        details: {},
        status: 'error',
      };

      jest.spyOn(healthCheckService, 'check').mockResolvedValue(health);
      const res = await healthController.check();

      expect(res).toBe(health);
      expect(healthCheckService.check).toHaveBeenCalled();
    });
  });
});
