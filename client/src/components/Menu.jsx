import React from "react";
import styled from "styled-components";
import MernTube from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
    Home,
    ExploreOutlined,
    SubscriptionsOutlined,
    VideoLibraryOutlined,
    HistoryOutlined,
    LibraryMusicOutlined,
    SportsEsportsOutlined,
    SportsBasketballOutlined,
    MovieOutlined,
    ArticleOutlined,
    LiveTvOutlined,
    AccountCircleOutlined,
    SettingsOutlined,
    FlagOutlined,
    HelpOutlineOutlined,
    SettingsBrightnessOutlined,
    Logout
} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";


const Container = styled.div`
  flex: 1.4;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  overflow-y: scroll;
  position: sticky;
  top: 0;

    ::-webkit-scrollbar {
        width: 7px;
    }

    ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgb(179, 179, 179);
        border-radius: 3px;
    }
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin");
        console.log("User has been loged out");
    }

    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={MernTube} />
                        MernTube
                    </Logo>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <Home />
                        Home
                    </Item>
                </Link>
                <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreOutlined />
                        Explore
                    </Item>
                </Link>
                <Link to="/subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SubscriptionsOutlined />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />
                <Item>
                    <VideoLibraryOutlined />
                    Library
                </Item>
                <Item>
                    <HistoryOutlined />
                    History
                </Item>
                <Hr />
                {
                    !currentUser ? (
                        <>
                            <Login>
                                Sign in to like videos, comment, and subscribe.
                                <Link to="signin" style={{ textDecoration: "none" }}>
                                    <Button>
                                        <AccountCircleOutlined />
                                        SIGN IN
                                    </Button>
                                </Link>
                            </Login>
                            <Hr />
                        </>
                    ) : (
                        <>
                            <Button onClick={handleLogout}>
                                <Logout />
                                LOGOUT
                            </Button>
                            <Hr />
                        </>
                    )
                }
                <Title>BEST OF LAMATUBE</Title>
                <Item>
                    <LibraryMusicOutlined />
                    Music
                </Item>
                <Item>
                    <SportsBasketballOutlined />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlined />
                    Gaming
                </Item>
                <Item>
                    <MovieOutlined />
                    Movies
                </Item>
                <Item>
                    <ArticleOutlined />
                    News
                </Item>
                <Item>
                    <LiveTvOutlined />
                    Live
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlined />
                    Settings
                </Item>
                <Item>
                    <FlagOutlined />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlined />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <SettingsBrightnessOutlined />
                    {darkMode ? "Light" : "Dark"} Mode
                </Item>
            </Wrapper>
        </Container>
    );
};

export default Menu;