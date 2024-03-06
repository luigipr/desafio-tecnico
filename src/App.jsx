import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignInPage from './pages/SignInPage/SignInPage';
import styled from "styled-components";
import { TokenProvider } from "./contexts/TokenContext";
import HomePage from "./pages/HomePage/HomePage";
import DirectoriesPage from "./pages/DirectoriesPage/DirectoriesPage";
import DirectoryPage from "./pages/DirectoryPage/DirectoryPage";


function App() {
  

  return (
    <PagesContainer>
    <BrowserRouter>
    <TokenProvider>
        <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/directories" element={<DirectoriesPage />} />
        <Route path="/directory/:id" element={<DirectoryPage />} />
        </Routes>
        </TokenProvider>
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