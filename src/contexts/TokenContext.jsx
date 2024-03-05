import { createContext, useState } from "react";
import api from "../services/api";
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Login function
  const localLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', JSON.stringify(token));
  };

  const refreshToken = () => {
    // Send a request to the server to refresh the access token using the refresh token
    console.log(token);
    const refresh = token.refresh;
    api.refreshToken(token)
      .then(response => {
        const newToken = response.data;
        console.log(newToken);
        localLogin({access: response.data, refresh});
      })
      .catch(error => {
        console.error('Error refreshing token:', error);
        // Handle token refresh failure
      });
  };

  return (
    <TokenContext.Provider value={{ token, setToken, localLogin, refreshToken }}>
      {children}
    </TokenContext.Provider>
  );
};
