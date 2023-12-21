import { registerEnumType } from 'type-graphql';

export enum PermissionEnum {
  ADMINISTRATOR = 'ADMINISTRATOR',
}

registerEnumType(PermissionEnum, {
  name: 'PermissionEnum',
});
