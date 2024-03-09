import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import Header from '@/components/Header';
import Providers from '@/components/Providiers';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import CookieManager from '@/Libs/CookieManager';
import AuthApi from '@/API/AuthApi';
import UserContext, { UserContextProps } from '@/context/UserContext';
import styles from './index.module.scss';

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children }:Props) => {
  const router = useRouter();
  const headerVisible = useMemo<boolean>(
    () => !router.pathname.startsWith('/admin'),
    [router.pathname],
  );
  const queryClient = new QueryClient();
  const [user, setUser] = useState<User|undefined>(undefined);
  const userContextValue = useMemo<UserContextProps>(() => ({
    user,
    setUser,
  }), [user]);
  useEffect(() => {
    // https 사용 강제
    if (process.env.NEXT_PUBLIC_ENV === 'production' && !window.location.href.startsWith('https://')) {
      window.location.replace('https://mtsealove.com');
    }
    const token = CookieManager.getCookie('accessToken');
    if (token) {
      AuthApi.setToken(token);
      AuthApi.getMe()
        .then((res) => {
          setUser(res.data);
        });
    }
    const onResize = () => {
      // 모바일 최적화
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
        <Providers>
            <UserContext.Provider value={userContextValue}>
                <QueryClientProvider client={queryClient}>
                    <main className={styles.main}
                          id='main'>
                        {children}
                    </main>
                    {headerVisible && (
                        <Header />
                    )}
                </QueryClientProvider>
            </UserContext.Provider>
        </Providers>
  );
};

export default AppLayout;
