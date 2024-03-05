import styled from "styled-components";
import { IonIcon } from "@ionic/react";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import { useState } from "react";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const [arrow, setArrow] = useState(false);
    const { setToken } = useToken();
    const navigate = useNavigate();

    function arrowChange() {
        if (!arrow) {
          setArrow(true);
        } else {
          setArrow(false);
        }
      }

      function logOut() {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
      }

    return (      
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
      </Container>)
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