import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../contexts/TokenContext";
import DirectoryCard from "../../components/DirectoryCard";
import useToken from "../../hooks/useToken";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/Header";

export default function HomePage() {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const navigate = useNavigate();
  const { token } = useToken();
  const {refreshToken} = useContext(TokenContext)
  const [form, setForm] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const intervalId = setInterval(refreshToken, 60000);
    console.log(token);
    return () => clearInterval(intervalId);
   }, [refreshToken, token]);

   function display() {
    if(form === false) setForm(true);
    if(form === true) setForm(false);
   }

  function postNewDirectory(e){
    e.preventDefault();
    const decoded = jwtDecode(token.access);

    const user = decoded.user_id;
    const newbody = {user, name, parent};

    const promise = api.postNewDirectory(newbody, token);
    promise.then( answer => {
      setForm(false);
    });
    promise.catch( err  => {alert(err.response)});
  }

  return (
    <Page>
      <Header></Header>
      <Cards>
        <DirectoryCard size={50} color="red" text="All directories" onClick={() => {navigate("/directories")}}/>
        <DirectoryCard onClick={display} size={50} color="red" text="Create new directory"/>
      </Cards>
      <Post>
      <form onSubmit={postNewDirectory}>
        <h1>Add new directory</h1>
        <input placeholder="Directory name"  type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="Parent diretory" type="text" value={parent} onChange={ (e) => setParent(e.target.value)}/>
        <button>Create</button>
      </form>
      </Post>
    </Page>
  );
}

const Page = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
`

const Cards = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: white;
`;

const Post = styled.div`
display: none;
height: 250px;
width: 50%;
display: flex;

flex-direction: column;
justify-content: center;
align-items: center;
`;