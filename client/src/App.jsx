import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Home/Home';
import Income from './pages/Home/Income';
import Expense from './pages/Home/Expense';
import UserProvider from './context/UserContext';

const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  // Redirect to home if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  );
}

export default function App() {

  return(
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
            {/* Redirect old dashboard route to home */}
            <Route path='/dashboard' element={<Navigate to="/home" replace />} />
          </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

