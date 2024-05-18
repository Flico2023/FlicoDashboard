import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLogin } from '../context/LoginContect';

const SecureRoute = ({ children }) => {
  const location = useLocation();
  const {token, expireTime} = useLogin();

  const isExpired= () => {
    if (!token || !expireTime) {
        console.log("token veya expireTime yok")
      return true;
    }

    const now = new Date();

    console.log("now", now)

    const isExpired = new Date() > expireTime;

    console.log("isExpired", isExpired)
    return isExpired;
  };

  console.log("SECURE ROUTE ÇALIŞTI")


  if (isExpired()) {
    // Kullanıcı yetkilendirilmediyse, giriş sayfasına yönlendir.
    // Yönlendirme sırasında, son ziyaret edilen yerin bilgisi korunuyor.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default SecureRoute;
