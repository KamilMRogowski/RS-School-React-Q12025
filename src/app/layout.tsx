import '../styles/global.scss';
import ProvidersWrapper from '../components/ProvidersWrapper/ProvidersWrapper';
import React from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Pokemon Finder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
