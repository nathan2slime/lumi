import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@lumi/database';
import { env } from '@lumi/env';

import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

import { AuthService } from './auth/auth.service';

import { customAuthChecker, getAuthContext } from '../guard';
import { ContextPayloadType } from '../guard/types';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeGraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [AuthService],
      imports: [
        JwtModule.register({
          global: true,
          secret: env.TOKEN_HASH,
          signOptions: { expiresIn: '740h' },
        }),
        TokenModule,
        UserModule,
        AuthModule,
      ],
      useFactory: async (authService: AuthService) => {
        const isDev = env.NODE_ENV == 'development';

        return {
          context: (ctx: ContextPayloadType) =>
            getAuthContext(ctx, authService),
          validate: {
            always: true,
          },
          debug: isDev,
          introspection: true,
          playground: {},
          credentials: false,
          authChecker: customAuthChecker,
          emitSchemaFile: {
            path: './schema.gql',
          },
          authMode: 'error',
        };
      },
    }),
  ],
})
export class AppModule {}
