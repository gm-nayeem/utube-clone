import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Error from "./pages/Error";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 25px 40px;
`;


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);


  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route
                    index
                    element={
                      currentUser ? <Home type="random" /> : <Navigate to="/signin" />
                    }
                  />
                  {
                    currentUser && (
                      <>
                        <Route path="trends" element={<Home type="trend" />} />
                        <Route path="subscriptions" element={<Home type="sub" />} />
                        <Route path="search" element={<Search />} />
                        <Route path="video">
                          <Route path=":id" element={<Video />} />
                        </Route>
                      </>
                    )
                  }
                  <Route
                    path="signin"
                    element={!currentUser ? <SignIn /> : <Navigate to="/" />}
                  />
                  <Route path="*" element={<Error />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;