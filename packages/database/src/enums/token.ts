import { registerEnumType } from 'type-graphql';

export enum TokenEnum {
  AUTHORIZATION = 'AUTHORIZATION',
  NOTIFICATION = 'NOTIFICATION',
}

registerEnumType(TokenEnum, {
  name: 'TokenEnum',
});
