import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../contexts/TokenContext";
import DirectoryCard from "../../components/DirectoryItem";
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
  const [displayCard, setDisplayCard] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const intervalId = setInterval(refreshToken, 60000);
    return () => clearInterval(intervalId);
   }, [refreshToken, token]);
//toggle the post card
   const toggleCardDisplay = () => {
    setDisplayCard(!displayCard);
  };

  //post function
  function postNewDirectory(e){
    e.preventDefault();
    const decoded = jwtDecode(token.access);

    const user = decoded.user_id;
    const newbody = {user, name, parent};

    const promise = api.postNewDirectory(newbody, token);
    promise.then( answer => {
      setDisplayCard(false);
    });
    promise.catch( err  => {alert(err.response)});
  }

  return (
    <Page>
      <Header></Header>
      <Cards>
        <DirectoryCard size={50} color="red" text="All directories" onClick={() => {navigate("/directories")}}/>
        <DirectoryCard onClick={toggleCardDisplay} display={displayCard} size={50} color="red" text="Create new directory"/>
      </Cards>
      <Post display={displayCard}>
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
  gap: 50px;
  background-color: white;
`;

const Post = styled.div`
h1{
  color: black;
}
form {
  justify-content: center;
  align-items: center;
  width: 100%;
}
height: 250px;
width: 50%;
display: ${props => (props.display ? 'flex' : 'none')};
margin: 0 auto;
`;