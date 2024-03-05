import styled from "styled-components";
import DirectoryEntry from "../../components/DirectoryEntry";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { TokenContext } from "../../contexts/TokenContext";

export default function DirectoriesPage() {
  const [allDirectories, setAllDirectories] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();
  const {refreshToken} = useContext(TokenContext);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getAllDirectories();
  }, [token]);

  function getAllDirectories() {
    const promise = api.getAllDirectories(token);
    promise.then((answer) => setAllDirectories(answer.data));
    promise.catch((error) => console.log(error.response.data));
  }

  return (
    <>
      <Header></Header>
      <DirectoriesContainer>
        {allDirectories.map((directory) => (
          <DirectoryEntry key={directory.id} directory={directory} />
        ))}
      </DirectoriesContainer>
    </>
  );
}

const DirectoriesContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
