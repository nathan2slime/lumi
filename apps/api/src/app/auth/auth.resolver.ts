import { Injectable } from '@nestjs/common';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { AuthService } from './auth.service';

import { SignUpInput } from './auth.types';

import { User } from '../../models/user.model';
import { ContextDataType } from '../../guard/types';

@Injectable()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'SignUp' })
  async signup(
    @Ctx() ctx: ContextDataType,
    // @Arg('data') data: SignUpInput,
  ): Promise<User> {
    return {
      clients: [],
      email: '',
      name: '',
      roles: [],
      tokens: [],
      surname: '',
    };
  }

  @Query(() => User, { name: 'Auth' })
  async auth() {
    return {
      clients: [],
      email: '',
      name: '',
      roles: [],
      tokens: [],
      surname: '',
    };
  }
}
