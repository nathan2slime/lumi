import { logger } from '@lumi/log';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { TokenEntity, TokenEnum, UserEntity } from '@lumi/database';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create<T = object>(user: UserEntity, type: TokenEnum, data: T) {
    const value = await this.jwtService.signAsync(data || {});

    const token = await this.tokenRepository.save({ value, type, user });

    return token;
  }

  decode<T = {}>(token: string) {
    try {
      return this.jwtService.decode(token) as T;
    } catch (error) {
      logger.error(error);
    }
  }

  async save(user: UserEntity, type: TokenEnum, value: string) {
    const token = await this.tokenRepository.save({ value, type, user });

    return token;
  }
}
