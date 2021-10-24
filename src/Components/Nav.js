import React from "react";
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () =>{
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">home</Navbar.Brand>
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item href = "/Account">帳戶資料</NavDropdown.Item>
                  <NavDropdown.Item href = "/Collection">收藏</NavDropdown.Item>
                  <NavDropdown.Item href = "/MyPost">我的文章</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href = "/LogIn">登入</NavDropdown.Item>
                  <NavDropdown.Item href="/SignIn">註冊</NavDropdown.Item>
                  <NavDropdown.Item>登出</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          {/* </Navbar.Collapse> */}
          </Container>
        </Navbar>  
    )
}

export default NavigationBar;