import { AuthChecker } from 'type-graphql';
import { logger } from '@lumi/log';

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
  { context: { token, authService }, info: { operation } },
  _roles,
) => {
  logger.info('checking user authorization', { operation });

  const user = await authService.authorization(token);

  return !!user;
};
