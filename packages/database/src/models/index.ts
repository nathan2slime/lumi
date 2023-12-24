import { BaseModelEntity } from './base.model';
import { ClientEntity } from './client.model';
import { PermissionEntity } from './permission.model';
import { RoleEntity } from './role.model';
import { TokenEntity } from './token.model';
import { UserEntity } from './user.model';
import { BillItemEntity } from './bill_item.model';
import { BillEntity } from './bill.model';

export const entities = [
  BaseModelEntity,
  UserEntity,
  ClientEntity,
  BillItemEntity,
  BillEntity,
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
export * from './bill.model';
export * from './bill_item.model';
