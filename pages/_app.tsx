import type { AppProps } from 'next/app';
import AppLayout from '@/components/AppLayout';
import '@/styles/fonts.scss';
import '@/styles/globals.scss';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
        <RecoilRoot>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </RecoilRoot>
  );
}
