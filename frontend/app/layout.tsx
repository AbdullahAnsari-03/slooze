'use client';

import './globals.css';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../lib/apollo-client';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          {/* 🔔 Toast container */}
          <Toaster position="top-right" />

          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}