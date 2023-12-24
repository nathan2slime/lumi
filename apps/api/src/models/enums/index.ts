import { BillItemTypeEnum, PermissionEnum, TokenEnum } from '@lumi/database';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(BillItemTypeEnum, {
  name: 'BillItemTypeEnum',
});

registerEnumType(PermissionEnum, {
  name: 'PermissionEnum',
});

registerEnumType(TokenEnum, {
  name: 'TokenEnum',
});
