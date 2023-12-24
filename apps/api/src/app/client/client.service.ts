import { ClientEntity, UserEntity } from '@lumi/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logger } from '@lumi/log';

import { ClientInput, UpdateClientInput } from './client.types';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async create(data: ClientInput, user: UserEntity) {
    try {
      const exists = await this.clientRepository.findOneBy({
        number: data.number,
      });

      if (exists) {
        logger.info('client already exists', { id: exists.id });
        return exists;
      }

      const client = await this.clientRepository.save({ ...data, user });
      logger.info('client created successfully', { id: client.id });

      return client;
    } catch (error) {
      logger.error('error creating client', { error });

      throw error;
    }
  }

  async findById(id: string) {
    try {
      const client = await this.clientRepository.findOneBy({ id });

      if (client) {
        logger.info('client found by id', { id });
        return client;
      } else {
        logger.info('client not found by id', { id });
        return;
      }
    } catch (error) {
      logger.error('error finding client by id', { id, error });

      throw error;
    }
  }

  async update({ id, ...data }: UpdateClientInput) {
    try {
      await this.clientRepository.update({ id }, data);
      const client = await this.findById(id);

      logger.info('client updated successfully', { id });

      return client;
    } catch (error) {
      logger.error('error updating client', { id, error });

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.clientRepository.softDelete({ id });

      logger.info('client deleted successfully', { id });
    } catch (error) {
      logger.error('error deleting client', { id, error });

      throw error;
    }
  }
}
