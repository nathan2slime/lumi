import toast from 'react-hot-toast';

import { ssrClient } from '@/app/lib/apollo-provider';
import { Context } from '@apollo/client';

import { AppRequest } from './types';

const isServer = typeof window == 'undefined';

const graphql = async <F, T extends object>({
  query,
  type = 'query',
  variables,
  token,
  notify = true,
  client = ssrClient,
}: AppRequest<T>) => {
  const context: Context = {
    headers: {
      Authorization: token,
    },
    fetchOptions: {},
  };

  try {
    const { data } = await (type === 'mutation'
      ? client.mutate<F, T>({
          mutation: query,
          variables,
          context,
        })
      : client.query<F, T>({
          query,
          variables,
          context,
        }));

    if (data) return data;
  } catch (error) {
    if (notify && !isServer) {
      toast.dismiss();
      const message = (error as Error).message;

      toast.error(message);
    }
  }
};

export default graphql;

export * from './types';
