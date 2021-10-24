import logo from './logo.svg';
import React, {Component} from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './pages/home';
// import SignIn from './pages/signIn';
import { Router, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        {/* <Router to="/" component={Home}/>
        <Router to="/signIn" component = {signIn}/> */}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">home</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Nav className="me-auto">
              
              
            </Nav>
            <Nav>
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item>帳戶資料</NavDropdown.Item>
                  <NavDropdown.Item>收藏</NavDropdown.Item>
                  <NavDropdown.Item>我的文章</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/signIn">登入</NavDropdown.Item>
                  <NavDropdown.Item>註冊</NavDropdown.Item>
                  <NavDropdown.Item>登出</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          {/* </Navbar.Collapse> */}
          </Container>
        </Navbar>  
    
    </div>
  );
}

export default App;
