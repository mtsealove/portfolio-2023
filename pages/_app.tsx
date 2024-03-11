import type { AppProps } from 'next/app';
import AppLayout from '@/layouts/AppLayout';
import RecoilWrapper from '@/layouts/RecoilWrapper';
import '@/styles/fonts.scss';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <RecoilWrapper>
          <AppLayout>
              <Component {...pageProps} />
          </AppLayout>
      </RecoilWrapper>
  );
}
