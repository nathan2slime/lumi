import {
  SignInDocument,
  SignInInput,
  SignInMutation,
  SignInMutationVariables,
  SignUpDocument,
  SignUpInput,
  SignUpMutation,
} from '@lumi/types';

import graphql, { AppService } from '@/graphql';

export const signInService = async ({
  client,
  data,
}: AppService<SignInInput>) =>
  await graphql<SignInMutation, SignInMutationVariables>({
    client,
    query: SignInDocument,
    type: 'mutation',
    variables: {
      data,
    },
  });

export const signUpService = async ({
  client,
  data,
}: AppService<SignUpInput>) =>
  await graphql<SignUpMutation, SignInMutationVariables>({
    client,
    query: SignUpDocument,
    type: 'mutation',
    variables: {
      data,
    },
  });
