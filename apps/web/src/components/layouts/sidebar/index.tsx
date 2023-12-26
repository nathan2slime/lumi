import Link from 'next/link';

import { useState } from 'react';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';

import { SidebarProps } from './model';
import { styles } from './styles';

import { items } from './utils';

import Energy from '@/assets/energy.svg';

export const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const style = styles({ open });

  const onToggle = () => setOpen(!open);

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
            })}
          </div>
        </div>

        <UserNav />
      </aside>
    </TooltipProvider>
  );
};
