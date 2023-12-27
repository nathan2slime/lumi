import {
  ClientsDocument,
  ClientsQuery,
  ClientsQueryVariables,
  SearchClientInput,
} from '@lumi/types';

import graphql, { AppService } from '@/graphql';

export const searchClientsService = async ({
  data,
  ...args
}: AppService<SearchClientInput>) =>
  await graphql<ClientsQuery, ClientsQueryVariables>({
    ...args,
    query: ClientsDocument,
    type: 'query',
    variables: {
      data,
    },
  });
