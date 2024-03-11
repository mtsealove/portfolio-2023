import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import Header from '@/components/Header';
import Providers from '@/components/Providiers';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Analytics } from '@vercel/analytics/react';
import CookieManager from '@/Libs/CookieManager';
import AuthApi from '@/API/AuthApi';
import UserContext, { UserContextProps } from '@/context/UserContext';
import { useRecoilState } from 'recoil';
import { modalVisible, projectId } from '@/context/RecoilState';
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
  const [mVisible, setMVisible] = useRecoilState<boolean>(modalVisible);
  const [pid, setPid] = useRecoilState<number>(projectId);
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
  useEffect(() => {
    if (pid !== -1) {
      router.push({ pathname: '/', query: { projectId: pid } });
    } else {
      router.replace('/');
    }
  }, [pid]);
  useEffect(() => {
    const n = Number(router.query.projectId);
    if (!Number.isNaN(n) && n !== -1) {
      setPid(n);
      setMVisible(true);
    } else {
      setPid(-1);
    }
  }, [router.query]);
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
                    <Analytics/>
                </QueryClientProvider>
            </UserContext.Provider>
        </Providers>
  );
};

export default AppLayout;
