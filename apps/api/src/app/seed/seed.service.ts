import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logger } from '@lumi/log';
import { faker } from '@faker-js/faker/locale/en';
import {
  PermissionEntity,
  PermissionEnum,
  RoleEntity,
  UserEntity,
} from '@lumi/database';
import { env } from '@lumi/env';
import { hash } from 'bcryptjs';

import { SignUpInput } from '../auth/auth.types';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async permission() {
    try {
      const permissions: PermissionEnum[] = [PermissionEnum.ADMINISTRATOR];

      return await Promise.all(
        permissions.map(async name => {
          const permission = await this.permissionRepository.findOneBy({
            name,
          });

          if (!permission) {
            const newPermission = this.permissionRepository.create({
              name,
            });

            await this.permissionRepository.save(newPermission);

            return newPermission;
          }

          return permission;
        }),
      );
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  }

  async admin() {
    try {
      const permissions = await this.permission();

      const role = this.roleRepository.create({
        name: faker.person.jobType().toLowerCase(),
        permissions,
      });

      const password = await hash(env.ADMIN_PASSWORD, 10);
      const email = env.ADMIN_EMAIL;
      const name = faker.person.firstName('male');
      const surname = faker.person.lastName('male');

      const payload: SignUpInput = {
        email,
        surname,
        name,
        password,
      };

      const user = this.userRepository.create(payload);

      await this.roleRepository.save(role);
      logger.info('success', 'user roles created');

      user.roles = [role];
      await this.userRepository.save(user);

      delete payload.password;

      logger.info('success', 'user created', payload);
    } catch (error) {
      logger.error(error);

      process.exit(1);
    }
  }
}
