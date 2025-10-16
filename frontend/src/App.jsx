import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import useAuthStore from './store/authStore.js';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar.jsx';
import OrdersPage from './pages/OrderPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="loading loading-spinner loading-lg mx-auto"></div>;
  }

  return (
    <>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/cart" element={authUser ? <CartPage /> : <Navigate to="/login" />} />
          <Route path="/cart" element={authUser ? <CartPage /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={authUser ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="/orders" element={authUser ? <OrdersPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Toaster />
    </>
  )
}

export default App;