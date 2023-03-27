import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Board from './Pages/Board/Board';
const MainPage = lazy(() => import('./Pages/Main'));

function App() {
  return (
    <div className='App'>
      <Header />
      <Suspense fallback={<div>로딩 중입니다</div>}>
        <Routes>
          <Route path='/' element={<Navigate to='/main' />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/board' element={<Board />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
