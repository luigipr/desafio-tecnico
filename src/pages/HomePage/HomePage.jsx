import { useContext, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import { TokenContext } from "../../contexts/TokenContext";
import DirectoryCard from "../../components/DirectoryCard";

export default function HomePage() {
  const [arrow, setArrow] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext);

  function arrowChange() {
    if (!arrow) {
      setArrow(true);
    } else {
      setArrow(false);
    }
  }

  function logOut() {
    setToken("");
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
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
        <DirectoryCard size={50} color="red" text="All directories" />
        <DirectoryCard size={50} color="red" text="All directories" />
        <DirectoryCard size={50} color="red" text="All directories" />
        <DirectoryCard size={50} color="red" text="All directories" />
        <DirectoryCard size={50} color="red" text="All directories" />
        <DirectoryCard size={50} color="red" text="All directories" />
      </Cards>
    </>
  );
}

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
  align-items:center;
  justify-content: center;
  gap: 20px;
  background-color: white;
`;
