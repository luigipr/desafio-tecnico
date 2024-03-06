import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DirectoryEntry({ directory }) {
  const { id, user, name, parent } = directory;
  const navigate = useNavigate();

  function details(id) {
    navigate(`/directory/${id}`);
}

  return (
    <DirectoryContainer key={id} onClick={() => details(id)}>
        <p>Id: {id}</p>
        <p>Creators Id: {user}</p>
        <p>Directory Name: {name}</p>
        <p>Parent directory id: {parent}</p>
    </DirectoryContainer>
  );
}

const DirectoryContainer = styled.div`
  width: 50%;
  height: 100px;
  top: 470px;
  left: 241px;
  border: 1px;
  p{
    color: white;
  }
  display: flex;
  flex-direction: column;
  background: #171717;
  border-radius: 15px;
  gap: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
