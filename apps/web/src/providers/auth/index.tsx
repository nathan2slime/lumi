'use client';

import { useCallback, useEffect, useState } from 'react';
import { TokenEnum } from '@lumi/database/enums';
import { User } from '@lumi/types';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

import { authService } from '@/services/auth.services';
import { useAuthState } from '@/store/auth';

import { getTokenByType } from '@/utils/funcs';
import { AppChildren } from '@/types';
import { styles } from './styles';

export const AuthProvider = ({ children }: AppChildren) => {
  const router = useRouter();
  const style = styles();

  const auth = useAuthState();

  const [loading, setLoading] = useState(auth.logged);

  const onRefresh = useCallback(async () => {
    if (auth.logged && auth.data) {
      const { tokens } = auth.data;

      setLoading(false);

      const token = tokens && getTokenByType(tokens, TokenEnum.AUTHORIZATION);

      if (token) {
        const res = await authService({ token: token.value, data: {} });

        if (res) {
          const user = res.Auth;

          auth.setLogged(true);
          auth.setUser(user as User);
          setLoading(false);

          return;
        }
      }
    }

    router.push('/auth/signin');

    setTimeout(() => {
      auth.setLogged(false);
    }, 1000);
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  if (auth.logged) return children;

  return loading ? (
    <div className={style.wrapper()}>
      <BeatLoader color="white" />
    </div>
  ) : (
    children
  );
};
