'use client';

import { useCallback, useEffect, useState } from 'react';
import { TokenEnum } from '@lumi/database/enums';
import { User } from '@lumi/types';
import { usePathname, useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { PermissionEnum } from '@lumi/database/enums';

import { authService } from '@/services/auth.services';
import { useAuthState } from '@/store/auth';

import { getTokenByType } from '@/utils/funcs';
import { AppChildren } from '@/types';
import { styles } from './styles';

const protectedRoutes = [
  {
    path: '/',
    permissions: [PermissionEnum.ADMINISTRATOR],
  },
  {
    path: '/new-bill',
    permissions: [PermissionEnum.ADMINISTRATOR],
  },
];

export const AuthProvider = ({ children }: AppChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const style = styles();

  const auth = useAuthState();

  const [loading, setLoading] = useState(true);

  const onRefresh = useCallback(async () => {
    if (auth.logged && auth.data) {
      const { tokens } = auth.data;

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
      setLoading(false);
    }, 2000);
  }, []);

  const onGuard = () => {
    if (pathname.includes('auth') && auth.logged) router.push('/bills');

    const route = protectedRoutes.find(route => pathname == route.path);

    if (!!route) {
      const userRoles = auth.data && auth.data.roles;

      const userPermissions = userRoles
        ? userRoles.reduce(
            (acc, role) => role.permissions.map(e => e.name as PermissionEnum),
            [] as PermissionEnum[],
          )
        : [];

      const isAuthorized = userPermissions.find(e =>
        route.permissions.includes(e),
      );

      if (!isAuthorized) router.push('/bills');
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (auth.logged) {
      onGuard();
    }
  }, [pathname]);

  return loading ? (
    <div className={style.wrapper()}>
      <BeatLoader color="#303030" />
    </div>
  ) : (
    children
  );
};
