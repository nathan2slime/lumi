import { TestBed } from '@automock/jest';

import { TokenService } from '../token.service';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const { unit } = TestBed.create(TokenService).compile();

    tokenService = unit;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
