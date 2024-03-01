import React from 'react';
import DirectoryIcon from './DirectoryIcon'; // Importe o ícone
import styled from 'styled-components';

const DirectoryCard = ({size, color, text}) => (
  
  <Card>

    <DirectoryIcon size={size} color={color} />
    <Text>{text}</Text>

  </Card>


);

export default DirectoryCard;

const Text = styled.p`
    font-size: 20px;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    width: 150px;
    height: 120px;
    border: 5px solid black;
    border-radius: 30%;

`