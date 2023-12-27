'use client';

import { AppChildren } from '@/types';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_APP_API_URL,
  });

  const isServer = typeof window === 'undefined';

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({}),
    link: isServer
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : httpLink,
  });
};

export const ssrClient = makeClient();

export const ApolloWrapper = ({ children }: AppChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
