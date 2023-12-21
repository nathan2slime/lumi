import { AuthChecker } from 'type-graphql';

import { AuthService } from '../app/auth/auth.service';

import { ContextDataType, ContextPayloadType } from './types';

export const getAuthContext = (
  ctx: ContextPayloadType,
  authService: AuthService,
): ContextDataType => ({
  token: ctx.req.headers.authorization,
  authService,
});

export const customAuthChecker: AuthChecker<ContextDataType> = async (
  { context: { token, authService } },
  _roles,
) => {
  //   const user = await authService.authorization(token);

  //   return !!user;

  return true;
};
