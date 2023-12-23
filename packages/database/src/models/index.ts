import { BaseModelEntity } from './base.model';
import { ClientEntity } from './client.model';
import { PermissionEntity } from './permission.model';
import { RoleEntity } from './role.model';
import { TokenEntity } from './token.model';
import { UserEntity } from './user.model';

export const entities = [
  BaseModelEntity,
  UserEntity,
  ClientEntity,
  TokenEntity,
  RoleEntity,
  PermissionEntity,
];

export * from './base.model';
export * from './permission.model';
export * from './user.model';
export * from './client.model';
export * from './role.model';
export * from './token.model';
