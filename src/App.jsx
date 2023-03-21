import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/common/header/Header';
const MainPage = lazy(() => import('./pages/main'));

function App() {
  return (
    <div className='App'>
      <Header />
      <Suspense fallback={<div>로딩 중입니다</div>}>
        <Routes>
          <Route path='/' element={<Navigate to='/main' />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
