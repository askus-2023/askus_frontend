import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './pages/main';
import Board from './pages/Board/Board';
import BoardDetailPage from './pages/Board/[id]';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/main' />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/board' element={<Board />} />
        <Route path='/board/:id' element={<BoardDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
