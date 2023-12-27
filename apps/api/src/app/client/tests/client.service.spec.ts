import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientEntity, UserEntity } from '@lumi/database';
import { Repository, UpdateResult } from 'typeorm';
import { faker } from '@faker-js/faker';

import { ClientService } from '../client.service';
import { ClientInput, SearchClientInput } from '../client.types';

describe('ClientService', () => {
  let clientRepository: Repository<ClientEntity>;
  let clientService: ClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(ClientEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );

    jest
      .spyOn(clientRepository, 'save')
      .mockImplementation(async (value: unknown) => value as ClientEntity);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(clientRepository).toBeDefined();
    expect(clientService).toBeDefined();
  });

  describe('create', () => {
    it('must create and return a new customer', async () => {
      const client: ClientInput = { number: expect.any(Number) };
      const user = {} as UserEntity;

      jest
        .spyOn(clientRepository, 'findOneBy')
        .mockImplementation(async options => null);

      const res = await clientService.create(client, user);

      expect(clientRepository.save).toHaveBeenCalledWith({ ...client, user });
      expect(clientRepository.findOneBy).toHaveBeenCalledWith({
        number: client.number,
      });
      expect(res).toMatchObject({ ...client, user });
    });

    it('must return the client if it already exists', async () => {
      const client: ClientInput = { number: expect.any(Number) };
      const user = {} as UserEntity;

      jest
        .spyOn(clientRepository, 'findOneBy')
        .mockImplementation(async options => client as ClientEntity);

      const res = await clientService.create(client, user);

      expect(clientRepository.save).not.toHaveBeenCalled();
      expect(clientRepository.findOneBy).toHaveBeenCalledWith({
        number: client.number,
      });
      expect(res).toMatchObject(client);
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);
      const client: ClientInput = { number: expect.any(Number) };
      const user = {} as UserEntity;

      jest
        .spyOn(clientRepository, 'findOneBy')
        .mockImplementation(
          async options => new Error(error) as unknown as ClientEntity,
        );

      const res = await clientService.create(client, user);

      expect(res).toMatchObject({ message: error });
      expect(clientRepository.findOneBy).toHaveBeenCalled();
      expect(clientRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const id = Math.random().toString();

    const payload = {
      address: faker.location.streetAddress(),
      installation: faker.number.int(),
      number: faker.string.alphanumeric(),
    };

    it('must update and return updated client', async () => {
      jest
        .spyOn(clientService, 'findById')
        .mockResolvedValue(payload as ClientEntity);

      const res = await clientService.update({ id, ...payload });

      expect(payload).toMatchObject(res);
      expect(clientRepository.update).toHaveBeenCalledWith({ id }, payload);
      expect(clientService.findById).toHaveBeenCalledWith(id);
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest.spyOn(clientRepository, 'update');
      jest.spyOn(clientService, 'findById').mockImplementation(async id => {
        return new Error(error) as unknown as ClientEntity;
      });

      const res = await clientService.update({ id, ...payload });

      expect(res).toMatchObject(new Error(error));
      expect(clientRepository.update).toHaveBeenCalled();
      expect(clientService.findById).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    const payload = {
      address: faker.location.streetAddress(),
      installation: faker.number.int(),
      number: faker.string.alphanumeric(),
    };
    const id = Math.random().toString();

    it('must return customer by id', async () => {
      jest
        .spyOn(clientRepository, 'findOneBy')
        .mockImplementation(async where => payload as ClientEntity);

      const res = await clientService.findById(id);

      expect(res).toMatchObject(payload);
      expect(clientRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest
        .spyOn(clientRepository, 'findOneBy')
        .mockImplementation(
          async where => new Error(error) as unknown as ClientEntity,
        );

      const res = await clientService.findById(id);

      expect(res).toMatchObject(new Error(error));
      expect(clientRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('remove', () => {
    const id = Math.random().toString();

    it('must remove customer by id', async () => {
      jest
        .spyOn(clientRepository, 'softDelete')
        .mockImplementation(async where => ({}) as UpdateResult);

      await clientService.remove(id);

      expect(clientRepository.softDelete).toHaveBeenCalledWith({ id });
    });

    it('should capture and return any error', async () => {
      const error = expect.any(String);

      jest
        .spyOn(clientRepository, 'softDelete')
        .mockImplementation(
          async where => new Error(error) as unknown as UpdateResult,
        );

      const res = await clientService.remove(id);

      expect(res).toBeUndefined();
      expect(clientRepository.softDelete).toHaveBeenCalledWith({ id });
    });
  });

  describe('search', () => {
    const payload: SearchClientInput = {
      limit: 10,
      number: expect.any(String),
      page: 1,
    };

    it('should return search results', async () => {
      const clients = [{}, {}, {}] as ClientEntity[];

      jest
        .spyOn(clientRepository, 'find')
        .mockImplementation(async where => clients);

      const res = await clientService.search(payload);

      expect(res.items).toMatchObject(clients);
      expect(clientRepository.find).toHaveReturnedTimes(1);
    });
  });
});
