import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenEntity, UserEntity } from '@lumi/database';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from '../../token/token.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { AuthToken, SignInInput, SignUpInput } from '../auth.types';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        TokenService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    tokenService = module.get<TokenService>(TokenService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('auth', () => {
    it('must return a user and create a authorization token for him', async () => {
      const token = {
        type: expect.any(String),
      } as TokenEntity;
      const payload = {
        id: faker.string.uuid(),
        tokens: [token],
      } as UserEntity;

      jest.spyOn(tokenService, 'create').mockResolvedValue(token);
      jest.spyOn(userService, 'findById').mockResolvedValue(payload);

      const user = await authService.auth(payload);

      expect(tokenService.create).toHaveBeenCalledWith(payload, token.type, {
        user: payload.id,
      });
      expect(userService.findById).toHaveBeenCalledWith(payload.id);
      expect(user).toMatchObject(payload);
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);
      const token = {
        type: expect.any(String),
      } as TokenEntity;
      const payload = {
        id: faker.string.uuid(),
        tokens: [token],
      } as UserEntity;

      jest.spyOn(tokenService, 'create').mockResolvedValue(token);

      jest
        .spyOn(userService, 'findById')
        .mockImplementation(
          async () => new Error(error) as unknown as UserEntity,
        );

      const res = await authService.auth(payload);

      expect(tokenService.create).toHaveBeenCalledWith(payload, token.type, {
        user: payload.id,
      });
      expect(userService.findById).toHaveBeenCalledWith(payload.id);
      expect(res).toMatchObject(new Error(error));
    });
  });

  describe('signUp', () => {
    it('must create and return a new user', async () => {
      const id = faker.string.uuid();
      const payload = { email: faker.internet.email() } as SignUpInput;
      const user = payload as UserEntity;

      jest.spyOn(userService, 'create').mockResolvedValue(id);
      jest.spyOn(userService, 'findById').mockResolvedValue(user);
      jest.spyOn(authService, 'auth').mockResolvedValue(user);

      const res = await authService.signUp(payload);

      expect(userService.findById).toHaveBeenCalledWith(id);
      expect(authService.auth).toHaveBeenCalledWith(user);
      expect(userService.create).toHaveBeenCalledWith(payload);
      expect(res).toBe(user);
    });

    it('should capture and return any error', async () => {
      const error = faker.string.sample(5);
      const payload = { email: faker.internet.email() } as SignUpInput;

      jest.spyOn(userService, 'create').mockImplementation(async () => {
        throw Error(error) as unknown as string;
      });
      jest.spyOn(userService, 'findById');
      jest.spyOn(authService, 'auth');

      try {
        await authService.signUp(payload);
      } catch (err) {
        expect(userService.findById).not.toHaveBeenCalled();
        expect(userService.create).toHaveBeenCalledWith(payload);
        expect(authService.auth).not.toHaveBeenCalled();
        expect(err).toMatchObject(new Error(error));
      }
    });
  });

  describe('signIn', () => {
    const payload: SignInInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const user = {
      ...payload,
      id: expect.any(Number),
    } as UserEntity;

    it('must log in as user and return it', async () => {
      require('bcryptjs').compare = jest.fn(() => true);

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(authService, 'auth').mockResolvedValue(user);
      const res = await authService.signIn(payload);

      expect(res).toBe(user);
      expect(userService.findByEmail).toHaveBeenCalledWith(payload.email);
    });

    it('should return error when user does not exist', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(authService, 'auth').mockResolvedValue(user);

      try {
        await authService.signIn(payload);

        expect(false).toBe(true);
      } catch (error) {
        expect(error).toMatchObject(new Error('Invalid credentials'));
        expect(userService.findByEmail).toHaveBeenCalledWith(payload.email);
      }
    });

    it('should return an error when the password is invalid', async () => {
      require('bcryptjs').compare = jest.fn(() => false);

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(authService, 'auth').mockResolvedValue(user);

      try {
        await authService.signIn(payload);

        expect(false).toBe(true);
      } catch (error) {
        expect(error).toMatchObject(new Error('Invalid credentials'));
        expect(userService.findByEmail).toHaveBeenCalledWith(payload.email);
      }
    });
  });

  describe('authorization', () => {
    const user = {
      id: '231',
    } as UserEntity;

    it('must return the user by token', async () => {
      const token = faker.string.binary();
      user.tokens = [{ value: token } as TokenEntity];

      jest.spyOn(tokenService, 'decode').mockReturnValue({ user: user.id });
      jest.spyOn(userService, 'findById').mockResolvedValue(user);

      const res = await authService.authorization(token);

      expect(userService.findById).toHaveBeenCalledWith(user.id);
      expect(tokenService.decode).toHaveBeenCalledWith(token);
      expect(res).toMatchObject(user);
    });

    it('should return an error if token is not passed', async () => {
      const token = undefined;

      jest.spyOn(tokenService, 'decode').mockReturnValue({ user: user.id });
      jest.spyOn(userService, 'findById').mockResolvedValue(user);

      try {
        await authService.authorization(token);

        expect(false).toBe(true);
      } catch (error) {
        expect(error).toMatchObject(new Error('Session expired'));
        expect(userService.findById).not.toHaveBeenCalled();
        expect(tokenService.decode).not.toHaveBeenCalled();
      }
    });

    it('should return an error if the token is not valid', async () => {
      const token = expect.any(String);
      const error = 'Invalid token';

      jest.spyOn(tokenService, 'decode').mockImplementation(() => {
        throw new Error(error);
      });
      jest.spyOn(userService, 'findById').mockResolvedValue(user);

      try {
        await authService.authorization(token);

        expect(true).toBe(false);
      } catch (err) {
        expect(err).toMatchObject(new Error(error));
        expect(userService.findById).not.toHaveBeenCalled();
      }
    });
  });
});
