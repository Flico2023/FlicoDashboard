import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

// Context'i oluştur
const LoginContext = createContext(null);

// Custom hook kullanımını kolaylaştırır
export const useLogin = () => useContext(LoginContext);

// Provider component'i
export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken") || "");
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");
  const [expireTime, setExpireTime] = useState(() =>
    new Date(localStorage.getItem("expireTime")) 
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");

  // Effect hook, localStorage'daki değişiklikleri takip eder
/*  useEffect(() => {
    // Token güncellendiğinde localStorage'ı güncelle
    if (token) {
        localStorage.setItem("jwtToken", token);

      const decodedPayload = jwtDecode(token);

      const expireTime = new Date(decodedPayload.exp * 1000 + new Date().getTimezoneOffset() * 60000);
      setExpireTime(expireTime);
      console.log(expireTime)
      localStorage.setItem("expireTime", expireTime.toISOString());

      const decodeUserId = decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      setUserId(decodeUserId);
      localStorage.setItem("userId", decodeUserId);

        setRole(decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        localStorage.setItem("role", decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);


    } else {
      // Token null ise, localStorage'dan sil
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("expireTime");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    }
  }, [token]);*/

  return (
    <LoginContext.Provider value={{ token, setToken, userId, expireTime, setExpireTime, setUserId }}>
      {children}
    </LoginContext.Provider>
  );
};
