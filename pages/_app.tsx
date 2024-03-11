import type { AppProps } from 'next/app';
import AppLayout from '@/layouts/AppLayout';
import '@/styles/fonts.scss';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AppLayout>
          <Component {...pageProps} />
      </AppLayout>
  );
}
