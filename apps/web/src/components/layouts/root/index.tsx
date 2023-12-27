'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Sidebar } from '../sidebar';
import { Navbar } from '../navbar';

import { AppChildren } from '@/types';
import { cn } from '@/lib/utils';

import { styles } from './styles';

export const RootLayout = ({ children }: AppChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const pathname = usePathname();

  const style = styles();

  const single = pathname.includes('auth');

  if (single) return children;

  return (
    <div className={style.wrapper()}>
      <Sidebar open={isOpenSidebar} onToggleOpen={e => setIsOpenSidebar(e)} />

      <div className={cn(style.page())}>
        <Navbar
          isOpenSidebar={isOpenSidebar}
          onToggle={e => setIsOpenSidebar(e)}
        />

        {children}
      </div>
    </div>
  );
};
