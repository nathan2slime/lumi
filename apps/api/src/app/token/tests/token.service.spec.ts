import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TokenEntity, UserEntity } from '@lumi/database';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TokenService } from '../token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  let jwtService: JwtService;
  let tokenRepository: Repository<TokenEntity>;

  const payload = {
    type: expect.any(String),
    value: expect.any(String),
  } as unknown as TokenEntity;
  const user = {
    id: 60,
  } as unknown as UserEntity;
  const secret = Math.random().toString();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        JwtService,
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
    jwtService = module.get<JwtService>(JwtService);
    tokenRepository = module.get<Repository<TokenEntity>>(
      getRepositoryToken(TokenEntity),
    );

    jest
      .spyOn(tokenRepository, 'save')
      .mockImplementation(async (value: unknown) => value as TokenEntity);
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(tokenRepository).toBeDefined();
  });

  it('must create and return a token', async () => {
    jest.spyOn(jwtService, 'signAsync');

    const res = await tokenService.create(
      user,
      payload.type,
      {
        id: user.id,
      },
      { secret },
    );

    expect(jwtService.signAsync).toHaveBeenCalled();
    expect(tokenRepository.save).toHaveBeenCalled();
    expect(res.value).not.toBeNull();
    expect(res.type).toBe(payload.type);
  });

  it('must create and decode a token', async () => {
    jest.spyOn(jwtService, 'signAsync');
    jest.spyOn(jwtService, 'decode');

    const token = await tokenService.create(
      user,
      payload.type,
      { id: user.id },
      { secret },
    );

    expect(jwtService.signAsync).toHaveBeenCalled();
    expect(tokenRepository.save).toHaveBeenCalled();
    expect(token.value).not.toBeNull();
    expect(token.type).toBe(payload.type);

    const data = tokenService.decode(token.value);

    expect(jwtService.decode).toHaveBeenCalled();
    expect(data).toMatchObject({ id: user.id });
  });

  it('must save and return a token', async () => {
    const token = expect.any(String);

    const data = await tokenService.save(user, payload.type, token);

    expect(tokenRepository.save).toHaveBeenCalled();
    expect(data.value).toBe(token);
  });
});
