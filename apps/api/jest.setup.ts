jest.mock('typeorm');
jest.mock('@lumi/env', () => ({ env: process.env }));
jest.mock('@lumi/database', () => ({
  TokenEntity: () => ({}),
  UserEntity: () => ({}),
  RoleEntity: () => ({}),
  ClientEntity: () => ({}),
  PermissionEntity: () => ({}),
}));
