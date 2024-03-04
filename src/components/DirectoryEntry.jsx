import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DirectoryEntry({ directory }) {
  const { id, user, name, parent } = directory;
  const navigate = useNavigate();

  function details(id) {
    navigate(`/directory/${id}`);
  }

  return (
    <DirectoryContainer key={id} onClick={() => details()}>
      <p>Id: {id}</p>
      <p>Id do criador: {user}</p>
      <p>Nome da pasta: {name}</p>
      <p>Id da pasta mãe: {parent}</p>
    </DirectoryContainer>
  );
}

const DirectoryContainer = styled.div`
  width: 611px;
  height: 276px;
  top: 470px;
  left: 241px;
  border: 1px;

  display: flex;
  flex-direction: column;
  background: #171717;
  border-radius: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
