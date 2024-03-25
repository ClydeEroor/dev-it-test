import './styles/globals.css';
import type { Metadata } from 'next';
import { Rowdies } from 'next/font/google';
import React from 'react';
import App from './app';

import { staticPath } from '@/utils/$path';

const fontOrbiton = Rowdies({
  subsets: ['latin'],
  style: 'normal',
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'Articles manager',
  description: 'Articles',
  icons: {
    icon: `${staticPath.favicon_ico}`,
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={fontOrbiton.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}

export default RootLayout;
