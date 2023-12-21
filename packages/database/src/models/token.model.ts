import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModelEntity } from './base.model';
import { TokenEnum } from '../enums';
import { UserEntity } from './user.model';

@Entity({
  synchronize: true,
  name: 'tokens',
})
export class TokenEntity extends BaseModelEntity {
  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: TokenEnum,
    default: TokenEnum.AUTHORIZATION,
  })
  type: TokenEnum;

  @ManyToOne(() => UserEntity, user => user.tokens)
  user: UserEntity;
}
