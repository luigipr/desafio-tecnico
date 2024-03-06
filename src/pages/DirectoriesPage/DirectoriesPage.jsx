import styled from "styled-components";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { TokenContext } from "../../contexts/TokenContext";
import DirectoryEntry from "../../components/DirectoryCard";

export default function DirectoriesPage() {
  const [allDirectories, setAllDirectories] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();

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
      <Title>
        <p>All Directories</p>
      </Title>
      <DirectoriesContainer>
        {/* puts all directories into components in a list */}
        {allDirectories.map((directory) => (
          <DirectoryEntry key={directory.id} directory={directory} />
        ))}
      </DirectoriesContainer>
    </>
  );
}

const Title = styled.div`
  width:100%;
  height: 50px;
  padding-bottom: 200px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    position: absolute;
    top: 5px;
    padding-top: 150px;
    color: black;
    font-size: 30px;
  }
`

const DirectoriesContainer = styled.div`
  padding-top: 20px;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 1px;
`;
