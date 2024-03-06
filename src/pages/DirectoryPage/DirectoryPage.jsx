import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";
import api from "../../services/api";
import useToken from "../../hooks/useToken";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function DirectoryPage() {
const { directoryId } = useParams();
const {token} = useToken();
const [directory, setDirectory] = useState([]);
const [formName, setFormName] = useState('');
const [formParent, setFormParent] = useState('');
const [editable, setEditable] = useState(false);

useEffect(() => {
    const promise = api.getDirectoryById(directoryId, token);
    promise.then( (answer) => {
        setDirectory(answer.data);
        console.log(answer.data)})
    promise.catch(error => console.log(error.response.data))
}, []);



  const { id, user, name, parent } = directory;
  const navigate = useNavigate();
  
  
  function deleteDirectory(directory, directoryId, token) {
    const promise = api.deleteDirectory(directory, directoryId, token);
    promise.then(window.location.reload());
    promise.catch((error) => console.log(error.response.data));
    navigate('/home');
  }

  const edit = () => {
    setEditable(!editable);
  };


  function editDirectory(e) {
    e.preventDefault();


  }

  return (
    <Page>
    <Header></Header>
    <DirectoryContainer key={id}>
      <Left>
        <p>Id: {id}</p>
        <p>Creators Id: {user}</p>
        <Form onSubmit={editDirectory}>
        <p>Directory Name: {name}</p>
          <input placeholder={name} type="text" value={name} readOnly={!editable} onChange={e => setFormName(e.target.value)} />
          <p>Parent directory name: {parent}</p>
          <input placeholder={parent} type="text" value={parent} readOnly={!editable} onChange={e => setFormParent(e.target.value)} />
          <button onClick={editDirectory} display={!editable}>Edit
         </button>
        </Form>
      </Left>
      <Right>
          <EditButton onClick={() => edit()} size="75" color="green"/>
          <DeleteButton onClick={() => deleteDirectory()} w='110' h='75' color="red" />
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
  width: 65%;
  padding-left: 15px;
  gap: 10px;
`

const Right = styled.div`
  width: 35%;
  display: flex;
  justify-content: start;
  
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
