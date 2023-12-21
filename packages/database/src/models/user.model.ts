import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { hash } from 'bcryptjs';

import { BaseModelEntity } from './base.model';
import { RoleEntity } from './role.model';
import { TokenEntity } from './token.model';
import { ClientEntity } from './client.model';

@Entity({
  name: 'users',
  synchronize: true,
})
export class UserEntity extends BaseModelEntity {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RoleEntity, roles => roles.user)
  roles: RoleEntity[];

  @OneToMany(() => TokenEntity, token => token.user)
  tokens: TokenEntity[];

  @OneToMany(() => ClientEntity, client => client.user)
  clients: ClientEntity[];

  @BeforeInsert()
  async before() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
