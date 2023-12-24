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
  { context: { token, authService }, info },
  _roles,
) => {
  const operation = info.operation.name.value;
  logger.info('checking user authorization', { operation });

  const user = await authService.authorization(token);

  const authorizedRoles = user.roles.filter(
    role =>
      !!role.permissions.find(permission => _roles.includes(permission.name)),
  );

  const isAuthorized = authorizedRoles.length > 0;

  if (isAuthorized) {
    logger.info('start operation', operation);
  } else {
    logger.error('user does not have authorization', { operation });
  }

  return isAuthorized;
};
