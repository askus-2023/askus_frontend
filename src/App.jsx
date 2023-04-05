import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './pages/main';
import Board from './pages/Board/Board';
import BoardDetailPage from './pages/Board/[id]';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/Profile/ProfileEdit';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/main' />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/board' element={<Board />} />
        <Route path='/board/:id' element={<BoardDetailPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
      </Routes>
    </div>
  );
}

export default App;
