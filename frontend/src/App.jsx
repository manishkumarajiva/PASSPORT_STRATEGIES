import React from 'react';
import SignIn from './components/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router';
import Success from './components/Success';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn/>} />
        <Route path='/success' element={<Success/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
