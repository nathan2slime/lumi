import toast from 'react-hot-toast';

import { ssrClient } from '@/app/lib/apollo-provider';

import { AppRequest } from './types';

const graphql = async <F, T extends object>({
  query,
  type = 'query',
  variables,
  token,
  notify = true,
  client = ssrClient,
}: AppRequest<T>) => {
  const context = {
    headers: {
      Authorization: token,
    },
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
    if (notify) {
      toast.dismiss();
      const message = (error as Error).message;

      toast.error(message);
    }
  }
};

export default graphql;

export * from './types';
