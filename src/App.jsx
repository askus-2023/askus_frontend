import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilState } from 'recoil';
import { accessTokenState } from './recoil/auth/accessToken';

import Header from './components/header/Header';
import MainPage from './pages/main';
import Board from './pages/Board/Board';
import BoardDetailPage from './pages/Board/[boardId]';
import BoardWritePage from './pages/Board/BoardWrite';
import BoardEditPage from './pages/Board/BoardEdit';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/Profile/ProfileEdit';
import PersistLogin from './components/auth/PersistLogin';
import RequireAuth from './components/auth/RequireAuth';
import RemoveTrailingSlash from './components/RemoveTrailingSlash';
import RequireLoginPage from './pages/auth/RequireLogin';
import CardSection from './components/board/CardSection';
import { AccessToken } from './infra/AccessToken';

export const aT = new AccessToken()

function App() {
  const queryClient = new QueryClient();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  useEffect(() => {
    aT.aTSetter(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (accessToken) {
      if (aT.newATGetter()) {
        setAccessToken(aT.newATGetter())
      }
    }
  }, [accessToken, setAccessToken])

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <RemoveTrailingSlash />
        <Header />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path='/' element={<Navigate to='/main' />} />
            <Route path='/main' element={<MainPage />} />
            <Route element={<RequireAuth />}>
              <Route path='/board' element={<Board />}>
                <Route path='' element={<CardSection tag='' />} />
                <Route path='korean' element={<CardSection tag='KOREAN' />} />
                <Route
                  path='japanese'
                  element={<CardSection tag='JAPANESE' />}
                />
                <Route
                  path='western'
                  element={<CardSection tag='EUROPEAN' />}
                />
                <Route
                  path='chinese'
                  element={<CardSection tag='CHINESE' />}
                />
                <Route path='etc' element={<CardSection tag='ETC' />} />
              </Route>
              <Route path='/board/:boardId' element={<BoardDetailPage />} />
              <Route path='/board/write' element={<BoardWritePage />} />
              <Route
                path='/board/:boardId/edit'
                element={<BoardEditPage />}
              />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<ProfileEdit />} />
            </Route>

            <Route path='/require-login' element={<RequireLoginPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
