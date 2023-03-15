import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CardImage from "../assets/react.jpeg"
import myLogo from "../assets/myLogo.jpeg";


const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "350px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const ImageContainer = styled.div`
  flex: 1;
`

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  object-fit: cover;
  background-color: #999;

`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <ImageContainer>
          <Image
            type={type}
            src={CardImage}
          />
        </ImageContainer>
        <Details type={type}>
          <ChannelImage
            type={type}
            src={myLogo}
          />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Mern Dev</ChannelName>
            <Info>660,908 views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;