import { ApolloClient, InMemoryCache } from '@apollo/client';
import { DocumentNode, TypedQueryDocumentNode } from 'graphql';

export type AppRequest<T> = {
  query: DocumentNode | TypedQueryDocumentNode;
  variables: T;
  type: 'query' | 'mutation';
  client?: ApolloClient<any>;
  token?: string;
  notify?: boolean;
};

export type AppService<T> = {
  data: T;
  client?: ApolloClient<any>;
  token?: string;
};
