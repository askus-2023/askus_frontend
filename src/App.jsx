import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const MainPage = lazy(() => import('./pages/main'))

function App() {
  return (
  <div className='App'>
    <Routes>
      <Route path='/main' element={<MainPage />} />
    </Routes>
  </div>
  )
}

export default App;
