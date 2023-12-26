import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '@/providers/auth';
import { RootLayout } from '@/components/layouts/root';

import { ApolloWrapper } from './lib/apollo-provider';

import { toastOptions } from '@/utils/config/toast';
import { cn } from '@/lib/utils';

import { AppChildren } from '../types';

import '@/global/styles.scss';

const appFonts = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Lumi',
  description: 'Sample',
};

const AppLayout = ({ children }: AppChildren) => {
  return (
    <html lang="en">
      <body className={cn(appFonts.className)}>
        <ApolloWrapper>
          <AuthProvider>
            <RootLayout>{children}</RootLayout>
          </AuthProvider>
        </ApolloWrapper>
        <Toaster toastOptions={toastOptions} />
      </body>
    </html>
  );
};

export default AppLayout;
