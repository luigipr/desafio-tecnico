import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"

import api from "../../services/api"
import { TokenContext } from "../../contexts/TokenContext"

export default function SignInPage() {

  const [nameLogin, setNameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [btn, setBtn] = useState(false)
  const navigate = useNavigate()
  const {localLogin} = useContext(TokenContext)

  useEffect(() => {
  if(localStorage.getItem('token')) {
    navigate('/home');
  }},[navigate])

  function login(event) {
    event.preventDefault()
    setBtn(true)// O botao de SignUp fica desabilitado
    const loginData = {
      username: nameLogin,
      password: passwordLogin
    }

    if(passwordLogin !== null && passwordLogin !== '' && nameLogin !== null && nameLogin !== ''){

        api.login(loginData)
          .then(response => {
            const token = response.data
            console.log(token)
            localLogin(token)
            navigate('/home')
          })
          .catch((error) => {
            setBtn(false)
            alert(error.response.message)
          })
      }else{
        setBtn(false)
        alert('insira os dados corretos!') 
      }
    }


  return (

    <Container>

      <LeftSideContainer>
        <ContainerLeft>
          <div>
            <h1>Directories</h1>
          </div>
          <div>
            <h3>Aplicativo de gestão de pastas</h3>
          </div>
        </ContainerLeft>
      </LeftSideContainer>

      <RightSideContainer>
        <form onSubmit={login}>
          
          <input placeholder="Nome" type="text" value={nameLogin} onChange={e => setNameLogin(e.target.value)} />
          <input placeholder="Senha" required type="password" value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} />
          <Mybutton disabled={btn} style={{opacity: btn ? '.5' : '1'}}>Log In</Mybutton>
        </form>
        </RightSideContainer>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    height: 100vh;
    width:100vw;
`
const LeftSideContainer = styled.section`
    display:flex;
    justify-content: center;
    align-items: center;
    //height:100vh;
    width: 65%;
    background-color: black; 

`
const ContainerLeft = styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 80%;
    height: 40%;
    color:white;
    font-weight: 700;
    margin-bottom: 120px;
    

    div:nth-child(1){
        width: 500px;
        height: 70px;
        margin-bottom: 100px;
    
    }
    div:nth-child(2){
        width: 500px;
        height: 117px;
        line-height: 45px;
        
       
    }
    h1{
           font-size: 106px;
    }
    h3{
           font-size: 43px;
    }
`

const RightSideContainer = styled.section`
  width: 30%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  input{
    width:80%
  }
  button{
    width:80%;
  }
  
`
const Mybutton = styled.button`

`