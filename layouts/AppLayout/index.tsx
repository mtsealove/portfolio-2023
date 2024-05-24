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
import ProjectContext, { ProjectContextProps } from '@/context/ProjectContext';
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number>(-1);
  const userContextValue = useMemo<UserContextProps>(() => ({
    user,
    setUser,
  }), [user]);
  const projectContextValue = useMemo<ProjectContextProps>(() => ({
    projectId, setProjectId, modalVisible, setModalVisible,
  }), [modalVisible, projectId]);
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
    if (router.pathname === '/') {
      if (projectId !== -1) {
        router.push({ pathname: '/', query: { projectId } });
      } else {
        router.push('/');
      }
    }
  }, [projectId, router.pathname]);
  useEffect(() => {
    const n = Number(router.query.projectId);
    if (!Number.isNaN(n) && n !== -1) {
      setProjectId(n);
      setModalVisible(true);
    } else {
      setProjectId(-1);
      setModalVisible(false);
    }
  }, [router.query]);

  return (
        <Providers>
            <UserContext.Provider value={userContextValue}>
              <ProjectContext.Provider value={projectContextValue}>
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
              </ProjectContext.Provider>

            </UserContext.Provider>
        </Providers>
  );
};

export default AppLayout;
