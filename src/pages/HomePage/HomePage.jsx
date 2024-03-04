import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import { TokenContext } from "../../contexts/TokenContext";
import DirectoryCard from "../../components/DirectoryCard";
import useToken from "../../hooks/useToken";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

export default function HomePage() {
  const [arrow, setArrow] = useState(false);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [allDirectories, setAllDirectories] = useState([[]])
  //setToken(localStorage.getItem(token, JSON.parse(token)));


  useEffect(() => {
    if (!token) {
      navigate("/");
    }
   }, [navigate, token]);



  function arrowChange() {
    if (!arrow) {
      setArrow(true);
    } else {
      setArrow(false);
    }
  }

  function getAllDirectories() {
    const promise = api.getAllDirectories(token)
        promise.then( (answer) => setAllDirectories(answer.data))
        promise.catch(error => console.log(error.response.data))
  }

  function postNewDirectory(e){
    e.preventDefault();
    const decoded = jwtDecode(token.access);

    const user = decoded.user_id;
    const newbody = {user, name, parent};

    const promise = api.postNewDirectory(newbody, token);
    promise.then( answer => {

    });
    promise.catch( err  => {alert(err.response)});
  }

  function logOut() {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <Page>
      <Container>
        <HeaderUp>
          <Logo>Directories</Logo>
          <Menu>
            <IonIcon
              onClick={arrowChange}
              icon={arrow ? chevronUpOutline : chevronDownOutline}
              style={{
                fontSize: "24px",
                color: "white",
                backgroundColor: "#151515",
              }}
            />
          </Menu>
        </HeaderUp>
        <HeaderDown
          onClick={logOut}
          style={{ display: arrow ? "flex" : "none" }}
        >
          <h3> Logout </h3>
        </HeaderDown>
      </Container>

      <Cards>
        <DirectoryCard size={50} color="red" text="All directories" onClick={() => getAllDirectories()}/>
        <DirectoryCard size={50} color="red" text="Create new directory" onClick="a"/>
      </Cards>

      <Form>
      <form onSubmit={postNewDirectory}>
        <h1>Add new directory</h1>
        <input placeholder="Directory name"  type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="Parent diretory" type="text" value={parent} onChange={ (e) => setParent(e.target.value)}/>
        <button>Create</button>
      </form>
      </Form>

      {/* <DirectoriesContainer>
      {allDirectories.map(directory => (<DirectoryEntry key={directory.id} directory={directory} />))}
      </DirectoriesContainer> */}


    </Page>
  );
}

const Page = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeaderUp = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 72px;
  background-color: #151515;
  color: white;
`;

const Logo = styled.div`
  width: 108px;
  height: 54px;
  font-weight: 700;
  font-size: 50px;

  padding-left: 15px;
  background-color: #151515;
`;

const Menu = styled.div`
  background-color: #151515;
  padding-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-left: 15px;
  }
`;

const HeaderDown = styled.div`
  //display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 72px;
  right: 0;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  height: 47px;
  background-color: #151515;
  color: white;
  border-bottom-left-radius: 40px 35px;
  h3 {
    margin: auto;
  }
`;

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

// const DirectoriesContainer = styled.div`
//     padding-top: 20px;
//     display: flex;
//     flex-wrap: wrap;
//     gap: 15px;
// `;

const Form = styled.div`
display: none;
height: 250px;
width: 50%;
display: flex;

flex-direction: column;
justify-content: center;
align-items: center;
`;