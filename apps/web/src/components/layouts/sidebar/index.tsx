import Link from 'next/link';

import { useState } from 'react';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { PermissionEnum } from '@lumi/database/enums';

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';

import { useAuthState } from '@/store/auth';

import { SidebarProps } from './model';
import { styles } from './styles';

import { items } from './utils';

import Energy from '@/assets/energy.svg';

export const Sidebar = ({ open, onToggleOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { data: user } = useAuthState();

  const style = styles({ open });

  const onToggle = () => onToggleOpen(!open);

  const userRoles = user && user.roles;
  const userPermissions = userRoles
    ? userRoles.reduce(
        (acc, role) => role.permissions.map(e => e.name as PermissionEnum),
        [] as PermissionEnum[],
      )
    : [];

  return (
    <TooltipProvider>
      <aside className={style.wrapper()}>
        <Button
          className={style.toggle()}
          size="icon"
          variant="outline"
          onClick={onToggle}
        >
          <div className={style.toggleIcon()}>
            <ChevronRightIcon />
          </div>
        </Button>

        <div>
          <Energy className={style.logo()} />

          <div className={style.items()}>
            {items.map(item => {
              const active = pathname == item.path;
              const permissions = item.permissions;
              const isAuthorized = permissions
                ? !!permissions.find(e => userPermissions.includes(e))
                : true;

              if (isAuthorized) {
                return (
                  <Tooltip disableHoverableContent={open} key={item.path}>
                    <TooltipTrigger className={style.tooltip()}>
                      <Link href={item.path}>
                        <Button
                          className={style.item()}
                          size="default"
                          variant={active ? 'default' : 'secondary'}
                        >
                          <span className={style.itemIcon()}>{item.icon}</span>

                          <span className={style.itemText()}>{item.title}</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }
            })}
          </div>
        </div>

        <UserNav permissions={userPermissions} />
      </aside>
    </TooltipProvider>
  );
};
