import { createContext, useMemo, useState } from "react";
import PropTypes from 'prop-types'
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {

    const [token, setToken] = useState('');

    function localToken(token) {
        setToken(token);
        localStorage.setItem("token", token);
      }


      
    //memorizar o contexto para impedir renders desnecessarios  
    const contextValue = useMemo(() => ({ token, localToken }), [token]);

    return (
        <TokenContext.Provider value={ contextValue }>
            {children}
        </TokenContext.Provider>
    )
}

TokenProvider.propTypes = {
    children: PropTypes.node.isRequired
};