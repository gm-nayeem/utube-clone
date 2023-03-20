import React, { useState } from "react";
import styled from "styled-components";
import {
  AccountCircleOutlined,
  SearchOutlined,
  VideoCallOutlined,
  Logout
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  color: ${({ theme }) => theme.text};
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle search
  const handleSearch = () => {
    navigate(`/search?q=${searchTerm}`)
    setSearchTerm("");
  }

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
    console.log("User has been loged out");
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <SearchOutlined onClick={handleSearch} />
          </Search>
          {
            currentUser ? (
              <User>
                <VideoCallOutlined onClick={() => setOpen(true)} />
                <Avatar src={currentUser.img} />
                {currentUser.name}
                <Button onClick={handleLogout}>
                  <Logout />
                  LOGOUT
                </Button>
              </User>
            ) : (
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlined />
                  SIGN IN
                </Button>
              </Link>
            )
          }
        </Wrapper>
      </Container>
      {
        open && <Upload setOpen={setOpen}/>
      }
    </>
  );
};

export default Navbar;