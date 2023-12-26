'use client';

import { usePathname } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';

import { Sidebar } from '../sidebar';

import { AppChildren } from '@/types';
import { cn } from '@/lib/utils';

import { styles } from './styles';

export const RootLayout = ({ children }: AppChildren) => {
  const pathname = usePathname();

  const style = styles();

  const single = pathname.includes('auth');

  if (single) return children;

  return (
    <div className={style.wrapper()}>
      <Sidebar />

      <ScrollArea className={cn(style.page(), 'app-scroll-area')}>
        {children}
      </ScrollArea>
    </div>
  );
};
