import React from 'react';
import styled from 'styled-components';
import backgroundImg from './assets/background.jpg';
import FormContainer from './components/FormContainer'; 

const Container = styled.div`
  background: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  padding: 2rem 0; 
  height: 100vh;
  width: 100vw; 
  `;

const App = () => {
  return (
    <Container>
      <FormContainer />
    </Container>
  )
}

export default App; 