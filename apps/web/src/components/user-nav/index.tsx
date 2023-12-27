'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { User } from '@lumi/types';
import { PermissionEnum } from '@lumi/database/enums';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuthState } from '@/store/auth';

import { getAvatarFallback } from '@/utils/funcs';

import { styles } from './styles';
import { UserNavProps } from './model';

export const UserNav = ({ permissions }: UserNavProps) => {
  const auth = useAuthState();
  const router = useRouter();
  const user = auth.data as User;

  const style = styles();

  const onLogout = () => {
    auth.setLogged(false);
    localStorage.clear();
    router.push('/auth/login');
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <div className={style.trigger()}>
          <Button variant="ghost" className={style.button()}>
            <Avatar className={style.avatar()}>
              <AvatarFallback>
                {user && getAvatarFallback(user?.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={style.content()} align="end" forceMount>
        <DropdownMenuLabel>
          <div className={style.dropdown()}>
            <p className={style.name()}>{user?.name + ' ' + user?.surname}</p>
            <p className={style.email()}>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {permissions.includes(PermissionEnum.ADMINISTRATOR) && (
          <DropdownMenuGroup>
            <Link href="/new-bill">
              <DropdownMenuItem className={style.item()}>
                New bill
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onLogout()} className={style.item()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
