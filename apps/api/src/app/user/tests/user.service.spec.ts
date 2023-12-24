import { Test, TestingModule } from '@nestjs/testing';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '@lumi/database';
import { faker } from '@faker-js/faker/locale/en';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SignUpInput } from '../../auth/auth.types';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    jest
      .spyOn(userRepository, 'save')
      .mockImplementation(async (value: unknown) => value as UserEntity);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    const newUser: SignUpInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
    };

    it('must create user and return his id', async () => {
      const id = await userService.create(newUser);

      expect(userRepository.save).toHaveBeenCalledWith(newUser);
      expect(userRepository.exist).toHaveBeenCalledWith({
        where: {
          email: newUser.email.toLocaleLowerCase(),
        },
      });
      expect(id).not.toBeNull();
    });

    it('should return error if user already exists', async () => {
      jest
        .spyOn(userRepository, 'exist')
        .mockImplementation(async (_value: unknown) => true);

      try {
        await userService.create(newUser);
      } catch (error) {
        expect((error as Error).message).toBe('User already exists');
      }

      expect(userRepository.save).not.toHaveBeenCalled();
      expect(userRepository.exist).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('must return user by id', async () => {
      const user = {} as UserEntity;
      const id = Math.random().toString();

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(
          async (options: FindOneOptions<UserEntity>) => user,
        );

      const res = await userService.getById(id);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: {
          clients: true,
          roles: {
            permissions: true,
          },
          tokens: true,
        },
      });
      expect(res).toBe(user);
    });

    it('should return null if user was not found', async () => {
      const id = Math.random().toString();

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(
          async (options: FindOneOptions<UserEntity>) => null,
        );

      const res = await userService.getById(id);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: {
          clients: true,
          roles: {
            permissions: true,
          },
          tokens: true,
        },
      });
      expect(res).toBeNull();
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async options => {
          return new Error(error) as unknown as UserEntity;
        });

      const user = await userService.getById(expect.any(String));

      expect(user).toMatchObject({ message: error });
      expect(userRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('getByEmail', () => {
    const email = faker.internet.email().toLowerCase();

    it('must return user by email', async () => {
      const user = {} as UserEntity;

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(
          async (options: FindOneOptions<UserEntity>) => user,
        );

      const res = await userService.getByEmail(email);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email },
        relations: {
          clients: true,
          roles: {
            permissions: true,
          },
          tokens: true,
        },
      });
      expect(res).toBe(user);
    });

    it('should return null if user was not found', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(
          async (_options: FindOneOptions<UserEntity>) => null,
        );

      const res = await userService.getByEmail(email);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email },
        relations: {
          clients: true,
          roles: {
            permissions: true,
          },
          tokens: true,
        },
      });
      expect(res).toBeNull();
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async options => {
          return new Error(error) as unknown as UserEntity;
        });

      const user = await userService.getByEmail(email);

      expect(user).toMatchObject({ message: error });
      expect(userRepository.findOne).toHaveBeenCalled();
    });
  });
});
