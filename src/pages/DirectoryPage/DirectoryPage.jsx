import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";
import api from "../../services/api";
import useToken from "../../hooks/useToken";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function DirectoryPage() {
const { id } = useParams();
const {token} = useToken();
const [directory, setDirectory] = useState([]);
const [formName, setFormName] = useState('');
const [formParent, setFormParent] = useState('');
const [disabled, setDisabled] = useState(true);
const [edited, setEdited] = useState(false);

useEffect(() => {
    const promise = api.getDirectoryById(id, token);
    promise.then( (answer) => {
        setDirectory(answer.data[0]);
    })
    promise.catch(error => console.log(error.response.data))
}, [edited]);

  const navigate = useNavigate();
  
  function deleteDirectory() {
    const promise = api.deleteDirectory(id, token);
    console.log(directory)
    promise.catch((error) => console.log(error.messaage));
    navigate('/home');
  }

  const edit = () => {
    setDisabled(!disabled);
  };


  function editDirectory(e) {
    e.preventDefault();

    const newDirectory = {user: directory.user, name: formName, parent: formParent};

    const promise = api.updateDirectory(newDirectory, id, token);
    promise.catch((error) => console.log(error.response.data));
    setDisabled(true) 
    setEdited(!edited);
 }

  return (
    <Page>
    <Header></Header>
    <DirectoryContainer key={id}>
      <Left>
        <p>Id: {id}</p>
        <p>Creators Id: {directory.user}</p>
        <Form onSubmit={editDirectory}>
        <p>Directory Name: {directory.name}</p>
          <input placeholder={directory.name} type="text" value={formName} disabled={disabled} onChange={e => setFormName(e.target.value)} />
          <p>Parent directory name: {directory.parent}</p>
          <input placeholder={directory.parent} type="text" value={formParent} disabled={disabled} onChange={e => setFormParent(e.target.value)} />
          <button onClick={editDirectory} disabled={disabled}>Edit
         </button>
        </Form>
      </Left>
      <Right>
        <button onClick={() => edit()}  ><EditButton size="75" color="green"/></button>
        <button onClick={() => deleteDirectory()}> <DeleteButton  w='110' h='75' color="red" /></button>
      </Right>
    </DirectoryContainer>
    </Page>
  );
}

const Form = styled.form`
    justify-content: flex-start;
    align-items: flex-start;
    input {
        height: 10px;
        width: 300px;
    }
    button{
        height: 40px;
        width: 300px;
    }
`

const Page = styled.div`
    height: 100vh;
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: center;
`

const Left = styled.div`
  width: 60%;
  padding-left: 15px;
  gap: 10px;
`

const Right = styled.div`
  width: 35%;
  display: flex;
  justify-content: start;
  button {
    background-color: #171717;

  }
  @media (max-width: 830px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px
    }
  
`

const DirectoryContainer = styled.div`
  width: 60%;
  height: 300px;
  top: 470px;
  left: 241px;
  border: 1px;
  p{
    color: white;
    font-size: 22px;
  }
  display: flex;
  background: #171717;
  border-radius: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
