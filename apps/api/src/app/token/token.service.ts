import { logger } from '@lumi/log';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { TokenEntity, TokenEnum, UserEntity } from '@lumi/database';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create<T = object>(
    user: UserEntity,
    type: TokenEnum,
    data: T,
    options?: JwtSignOptions,
  ) {
    logger.info('creating new token', { type });
    const value = await this.jwtService.signAsync(data || {}, options);

    logger.info('saving token in database');
    const token = await this.tokenRepository.save({ value, type, user });

    logger.info('created new token', { type, email: user.email });

    return token;
  }

  decode<T = {}>(token: string) {
    try {
      logger.info('decoding a token');
      return this.jwtService.decode(token) as T;
    } catch (error) {
      logger.error(error);
    }
  }

  async save(user: UserEntity, type: TokenEnum, value: string) {
    logger.info('saving a custom token', type);
    const token = await this.tokenRepository.save({ value, type, user });

    logger.info('saved custom token', type);
    return token;
  }
}
