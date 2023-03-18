import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: red;
  margin-top: 20px;
`

const Error = () => {
  return (
    <Container>
      <Title>404 !! Not Found</Title>
    </Container>
  )
}

export default Error;