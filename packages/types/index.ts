import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  installation: Scalars['Float'];
  number: Scalars['Float'];
  updated_at?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  SignUp: User;
};


export type MutationSignUpArgs = {
  data: SignUpInput;
};

export type Permission = {
  __typename?: 'Permission';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  name: Scalars['String'];
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  Auth: User;
};

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: Permission;
  updated_at?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  surname: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  type: Scalars['String'];
  updated_at?: Maybe<Scalars['DateTime']>;
  user: User;
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  clients?: Maybe<Client>;
  email: Scalars['String'];
  name: Scalars['String'];
  roles?: Maybe<Role>;
  surname: Scalars['String'];
  tokens: Token;
};


export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SignUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', SignUp: { __typename?: 'User', email: string, name: string, surname: string, tokens: { __typename?: 'Token', id: string, value: string, type: string, created_at: any, updated_at?: any | null, deleted_at?: any | null }, roles?: { __typename?: 'Role', id: string, name: string, created_at: any, deleted_at?: any | null, updated_at?: any | null, permissions: { __typename?: 'Permission', name: string, id: string } } | null } };
