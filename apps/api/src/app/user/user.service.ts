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
    logger.info('starting user creation', data.email);

    const exists = await this.userRepository.exist({
      where: { email: data.email },
    });

    if (exists) {
      logger.error('user alredy exist with email', { email: data.email });
      throw new Error('User alredy exists');
    }

    data.password = await hash(data.password, 10);

    const user = await this.userRepository.save(data);
    logger.debug('user created', { id: user.id });

    return user.id;
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { tokens: true, roles: true, clients: true },
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { tokens: true, roles: true, clients: true },
    });

    return user;
  }
}
