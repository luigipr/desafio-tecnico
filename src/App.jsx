import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignInPage from './pages/SignInPage/SignInPage';
import styled from "styled-components";
import { TokenContext } from "./contexts/TokenContext";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";


function App() {
  const [token, setToken] = useState(undefined);

  return (
    <PagesContainer>
    <BrowserRouter>
    <TokenContext.Provider value={{token, setToken}}>
        <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        </Routes>
        </TokenContext.Provider>
    </BrowserRouter>
  </PagesContainer>
  );
}

export default App

const PagesContainer = styled.main`
  background-color: #333333;
  width: 100vw;
  max-height: 100vh;
  
`