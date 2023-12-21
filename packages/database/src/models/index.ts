import { ClientEntity } from './client.model';
import { PermissionEntity } from './permission.model';
import { RoleEntity } from './role.model';
import { TokenEntity } from './token.model';
import { UserEntity } from './user.model';

export const entities = [
  UserEntity,
  ClientEntity,
  TokenEntity,
  RoleEntity,
  PermissionEntity,
];

export * from './base.model';
