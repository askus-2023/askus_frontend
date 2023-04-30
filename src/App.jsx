import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Header from './components/header/Header';
import MainPage from './pages/main';
import Board from './pages/Board/Board';
import BoardDetailPage from './pages/Board/[id]';
import BoardWritePage from './pages/Board/Write';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/Profile/ProfileEdit';
import PersistLogin from './components/auth/PersistLogin';
import RequireAuth from './components/auth/RequireAuth';
import RemoveTrailingSlash from './components/RemoveTrailingSlash';
import RequireLoginPage from './pages/auth/RequireLogin';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className='App'>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RemoveTrailingSlash />
          <Header />
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path='/' element={<Navigate to='/main' />} />
              <Route path='/main' element={<MainPage />} />
              <Route element={<RequireAuth />}>
                <Route path='/board' element={<Board />} />
                <Route path='/board/:id' element={<BoardDetailPage />} />
                <Route path='/board/write' element={<BoardWritePage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/edit' element={<ProfileEdit />} />
              </Route>

              <Route path='/require-login' element={<RequireLoginPage />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
