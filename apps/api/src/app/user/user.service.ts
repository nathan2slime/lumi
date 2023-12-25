import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@lumi/database';
import { logger } from '@lumi/log';
import { hash } from 'bcryptjs';

import { SignUpInput } from '../auth/auth.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: SignUpInput) {
    try {
      logger.info('starting user creation', data.email.toLowerCase());

      const exists = await this.userRepository.exist({
        where: { email: data.email.toLowerCase() },
      });

      if (exists) {
        logger.error('user already exists with email', {
          email: data.email.toLowerCase(),
        });

        throw new Error('User already exists');
      }

      data.email = data.email.toLowerCase();
      data.password = await hash(data.password, 10);

      const user = await this.userRepository.save(data);
      logger.debug('user created', { id: user.id });

      return user.id;
    } catch (error) {
      logger.error('error during user creation', { error });
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: {
          tokens: true,
          roles: {
            permissions: true,
          },
          clients: true,
        },
      });

      if (!user) {
        logger.warn('user not found by id', { id });
      } else {
        logger.info('retrieved user by id', { id });
      }

      return user;
    } catch (error) {
      logger.error('error during user retrieval by id', {
        error,
      });

      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email.toLowerCase() },
        relations: {
          tokens: true,
          roles: {
            permissions: true,
          },
          clients: true,
        },
      });

      if (!user) {
        logger.warn('user not found by email', { email: email.toLowerCase() });
      } else {
        logger.info('retrieved user by email', { email: email.toLowerCase() });
      }

      return user;
    } catch (error) {
      logger.error('error during user retrieval by email', { error });
      throw error;
    }
  }
}
