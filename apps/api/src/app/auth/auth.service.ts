import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@lumi/database';
import { Repository } from 'typeorm';

import { SignUpInput } from './auth.types';

import { User } from '../../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signup(data: SignUpInput): Promise<User> {
    const user = this.userRepository.create(data);

    return user;
  }
}
