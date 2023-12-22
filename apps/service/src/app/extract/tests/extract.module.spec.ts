import { Test, TestingModule } from '@nestjs/testing';

import { ExtractModule } from '../extract.module';

describe('ExtractModule', () => {
  let extractModule: ExtractModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtractModule],
    }).compile();

    extractModule = module.get<ExtractModule>(ExtractModule);
  });

  it('should have defined the extract module', () => {
    expect(extractModule).toBeDefined();
  });
});
