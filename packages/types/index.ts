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

export type Bill = {
  __typename?: 'Bill';
  client: Client;
  created_at: Scalars['DateTime'];
  date: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  due_date: Scalars['DateTime'];
  file: Scalars['String'];
  id: Scalars['String'];
  items: Array<BillItem>;
  public_lighting_contribution: Scalars['Float'];
  total_price: Scalars['Float'];
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type BillInput = {
  client: Scalars['String'];
  date: Scalars['DateTime'];
  due_date: Scalars['DateTime'];
  file: Scalars['String'];
  items?: Array<BillItemInput>;
  public_lighting_contribution?: InputMaybe<Scalars['Float']>;
  total_price: Scalars['Float'];
};

export type BillItem = {
  __typename?: 'BillItem';
  amount: Scalars['Float'];
  bill: Bill;
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  price: Scalars['Float'];
  type: Scalars['String'];
  unit_price: Scalars['Float'];
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type BillItemInput = {
  amount: Scalars['Float'];
  price: Scalars['Float'];
  type: Scalars['String'];
  unit_price: Scalars['Float'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  bills: Array<Bill>;
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  installation?: Maybe<Scalars['Float']>;
  number: Scalars['String'];
  updated_at?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateBill: Bill;
  SignIn: User;
  SignUp: User;
};


export type MutationCreateBillArgs = {
  data: BillInput;
};


export type MutationSignInArgs = {
  data: SignInInput;
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
  Bills: Array<Bill>;
};

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: Array<Permission>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  clients?: Maybe<Array<Client>>;
  created_at: Scalars['DateTime'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  roles?: Maybe<Array<Role>>;
  surname: Scalars['String'];
  tokens?: Maybe<Array<Token>>;
  updated_at?: Maybe<Scalars['DateTime']>;
};


export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SignUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const AuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<AuthQuery, AuthQueryVariables>;
export const CreateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_price"}},{"kind":"Field","name":{"kind":"Name","value":"due_date"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit_price"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBillMutation, CreateBillMutationVariables>;
export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', SignUp: { __typename?: 'User', email: string, name: string, surname: string, tokens?: Array<{ __typename?: 'Token', id: string, value: string, type: string, created_at: any, updated_at?: any | null, deleted_at?: any | null }> | null, roles?: Array<{ __typename?: 'Role', id: string, name: string, created_at: any, deleted_at?: any | null, updated_at?: any | null, permissions: Array<{ __typename?: 'Permission', name: string, id: string }> }> | null } };

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', SignIn: { __typename?: 'User', id: string, name: string, surname: string, email: string, roles?: Array<{ __typename?: 'Role', id: string, created_at: any, updated_at?: any | null, deleted_at?: any | null, name: string, permissions: Array<{ __typename?: 'Permission', name: string, id: string }> }> | null, tokens?: Array<{ __typename?: 'Token', id: string, created_at: any, updated_at?: any | null, deleted_at?: any | null, type: string, value: string }> | null } };

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', Auth: { __typename?: 'User', id: string, name: string, surname: string, email: string, roles?: Array<{ __typename?: 'Role', id: string, created_at: any, updated_at?: any | null, deleted_at?: any | null, name: string, permissions: Array<{ __typename?: 'Permission', name: string, id: string }> }> | null, tokens?: Array<{ __typename?: 'Token', id: string, created_at: any, updated_at?: any | null, deleted_at?: any | null, type: string, value: string }> | null } };

export type CreateBillMutationVariables = Exact<{
  data: BillInput;
}>;


export type CreateBillMutation = { __typename?: 'Mutation', CreateBill: { __typename?: 'Bill', id: string, total_price: number, due_date: any, date: any, file: string, created_at: any, updated_at?: any | null, deleted_at?: any | null, client: { __typename?: 'Client', number: string, id: string }, items: Array<{ __typename?: 'BillItem', id: string, amount: number, unit_price: number, type: string, price: number }> } };
