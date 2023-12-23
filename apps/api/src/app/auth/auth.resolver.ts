import { Injectable } from '@nestjs/common';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { AuthService } from './auth.service';

import { SignInInput, SignUpInput } from './auth.types';

import { ContextDataType } from '../../guard/types';
import { User } from '../../models/user.model';

@Injectable()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'SignUp' })
  async signUp(@Arg('data') data: SignUpInput): Promise<User> {
    return await this.authService.signUp(data);
  }

  @Mutation(() => User, { name: 'SignIn' })
  async signIn(@Arg('data') data: SignInInput): Promise<User> {
    return await this.authService.signIn(data);
  }

  @Query(() => User, { name: 'Auth' })
  async auth(@Ctx() ctx: ContextDataType) {
    return this.authService.authorization(ctx.token);
  }
}
