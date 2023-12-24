import { Injectable } from '@nestjs/common';
import { logger } from '@lumi/log';
import { TokenEnum, UserEntity } from '@lumi/database';
import { compare } from 'bcryptjs';

import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

import { AuthToken, SignInInput, SignUpInput } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async auth(user: UserEntity) {
    try {
      logger.info('looking for authentication token for the user', {
        id: user.id,
      });

      const auth =
        user.tokens &&
        user.tokens.find(e => e.type === TokenEnum.AUTHORIZATION);

      if (auth) {
        logger.info('removing legacy token for the user', { id: user.id });
        await auth.remove();
      }

      await this.tokenService.create<AuthToken>(user, TokenEnum.AUTHORIZATION, {
        user: user.id,
      });

      return await this.userService.findById(user.id);
    } catch (error) {
      logger.error('Error in auth method', { error });
      throw error;
    }
  }

  async signUp(data: SignUpInput) {
    try {
      logger.info('starting user signup', data.email);

      const id = await this.userService.create(data);
      const user = await this.userService.findById(id);

      return await this.auth(user);
    } catch (error) {
      logger.error('error in signUp method', { error });
      throw error;
    }
  }

  async signIn({ email, ...data }: SignInInput) {
    try {
      logger.info('starting sign in with email', email);

      const user = await this.userService.findByEmail(email);
      if (!user) throw new Error('Invalid credentials');

      const match = await compare(data.password, user.password);

      if (match) {
        logger.info('user logged', { email });
        return this.auth(user);
      }

      logger.info('invalid credentials', { email });
      throw new Error('Invalid credentials');
    } catch (error) {
      logger.error('error in signIn method', { error });
      throw error;
    }
  }

  async authorization(token: string) {
    try {
      const err = new Error('Session expired');

      logger.info('starting token authorization check');

      if (token) {
        const data = this.tokenService.decode<AuthToken>(token);
        console.log(data);

        if (!data) throw err;

        const user = await this.userService.findById(data.user);
        if (!user) throw err;

        logger.info('user authorized', { user: user.id });

        return user;
      }

      throw new Error('Session expired');
    } catch (error) {
      logger.error('error in authorization method', { error });
      throw error;
    }
  }
}
