import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BillEntity,
  BillItemEntity,
  ClientEntity,
  TokenEntity,
  UserEntity,
} from '@lumi/database';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker/locale/en';
import { JwtService } from '@nestjs/jwt';

import { BillItemService } from '../../bill_item/bill_item.service';
import { ClientService } from '../../client/client.service';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../token/token.service';
import { UserService } from '../..//user/user.service';
import { BillService } from '../bill.service';

import { BillItemInput } from '../../bill_item/bill_item.types';
import { BillInput, SearchBillInput } from '../bill.types';

describe('BillService', () => {
  let billRepository: Repository<BillEntity>;
  let clientService: ClientService;
  let billItemService: BillItemService;
  let authService: AuthService;
  let billService: BillService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BillService,
        BillItemService,
        TokenService,
        ClientService,
        UserService,
        JwtService,
        AuthService,
        {
          provide: getRepositoryToken(BillEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ClientEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(BillItemEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    billService = module.get<BillService>(BillService);
    billRepository = module.get<Repository<BillEntity>>(
      getRepositoryToken(BillEntity),
    );
    billItemService = module.get<BillItemService>(BillItemService);
    clientService = module.get<ClientService>(ClientService);
    authService = module.get<AuthService>(AuthService);

    jest
      .spyOn(billRepository, 'save')
      .mockImplementation(async (value: unknown) => value as BillEntity);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(billRepository).toBeDefined();
    expect(billService).toBeDefined();
    expect(clientService).toBeDefined();
    expect(authService).toBeDefined();
    expect(billItemService).toBeDefined();
  });

  describe('create', () => {
    const payload: BillInput = {
      total_price: faker.number.int(),
      public_lighting_contribution: faker.number.int(),
      items: [
        {
          amount: faker.number.int(),
          price: faker.number.int(),
          type: 'ENERGY',
          unit_price: faker.number.int(),
        } as BillItemInput,
      ],
      client: faker.string.alphanumeric(),
      date: faker.date.anytime(),
      due_date: faker.date.anytime(),
      file: faker.string.sample(),
    };
    const bill = payload as unknown as BillEntity;
    const user = {} as UserEntity;
    const client = {} as ClientEntity;
    const token = expect.any(String);

    it('must create and return a new invoice', async () => {
      jest.spyOn(authService, 'authorization').mockResolvedValue(user);
      jest
        .spyOn(billItemService, 'createGroup')
        .mockResolvedValue(payload.items as BillItemEntity[]);
      jest.spyOn(clientService, 'create').mockResolvedValue(client);
      jest.spyOn(billService, 'findById').mockResolvedValue(bill);

      const res = await billService.create(payload, token);

      expect(authService.authorization).toHaveBeenCalledTimes(1);
      expect(clientService.create).toHaveBeenCalledTimes(1);
      expect(billItemService.createGroup).toHaveBeenCalledTimes(
        payload.items.length,
      );
      expect(billRepository.save).toHaveBeenCalledWith({
        client,
        total_price: payload.total_price,
        due_date: payload.due_date,
        public_lighting_contribution: payload.public_lighting_contribution,
        date: payload.date,
        file: payload.file,
      });
      expect(res).toMatchObject(bill);
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest.spyOn(authService, 'authorization').mockResolvedValue(user);
      jest
        .spyOn(billItemService, 'createGroup')
        .mockResolvedValue(payload.items as BillItemEntity[]);
      jest
        .spyOn(clientService, 'create')
        .mockImplementation(async (data, user) => {
          throw new Error(error) as unknown as ClientEntity;
        });
      jest.spyOn(billService, 'findById').mockResolvedValue(bill);

      try {
        await billService.create(payload, token);
      } catch (error) {
        expect(error as Error).toMatchObject(error);
      }

      expect(authService.authorization).toHaveBeenCalledTimes(1);
      expect(clientService.create).toHaveBeenCalledTimes(1);
      expect(billItemService.createGroup).not.toHaveBeenCalled();
      expect(billRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('must return bill by id', async () => {
      const id = expect.any(String);
      const bill = {} as BillEntity;

      jest
        .spyOn(billRepository, 'findOne')
        .mockImplementation(async where => bill);

      const res = await billService.findById(id);

      expect(billRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { client: true, items: true },
      });
      expect(billRepository.findOne).toHaveReturnedTimes(1);
      expect(res).toMatchObject(bill);
    });

    it('should capture and return any error', async () => {
      const id = expect.any(String);
      const error = expect.any(String);

      jest
        .spyOn(billRepository, 'findOne')
        .mockImplementation(
          async where => new Error(error) as unknown as BillEntity,
        );

      const res = await billService.findById(id);

      expect(billRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { client: true, items: true },
      });
      expect(billRepository.findOne).toHaveReturnedTimes(1);
      expect(res).toMatchObject(new Error(error));
    });
  });

  describe('search', () => {
    const payload: SearchBillInput = {
      client: expect.any(String),
      limit: 10,
      page: 1,
    };

    it('should return search results', async () => {
      const bills = [{}, {}, {}] as BillEntity[];

      jest
        .spyOn(billRepository, 'find')
        .mockImplementation(async where => bills);

      const res = await billService.search(payload);

      expect(res.items).toMatchObject(bills);
      expect(billRepository.find).toHaveReturnedTimes(1);
    });
  });
});
