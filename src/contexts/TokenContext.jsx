import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Login function
  const localLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', JSON.stringify(token));
  };

  return (
    <TokenContext.Provider value={{ token, setToken, localLogin }}>
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
