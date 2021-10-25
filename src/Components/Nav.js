import React from "react";
import { Nav, Navbar, Container, NavDropdown, NavbarBrand } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () =>{

    const login = true;// get login status

    return (
        // collapseOnSelect expand="lg"
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Project Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Navbar.Brand>實習職務</Navbar.Brand>
              <Navbar.Brand>活動資訊</Navbar.Brand>
              <Navbar.Brand>關於</Navbar.Brand>
            </Nav>
            <Nav>
              {
                login?(
                  <NavDropdown title="User Name" id="collasible-nav-dropdown">
                    <NavDropdown.Item href = "/Account">個人檔案</NavDropdown.Item>
                    <NavDropdown.Item href = "/MyPost">我的貼文</NavDropdown.Item>
                    <NavDropdown.Item href = "/Collection">珍藏項目</NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    {/* <NavDropdown.Item href = "/LogIn">登入</NavDropdown.Item> */}
                    {/* <NavDropdown.Item href="/SignIn">註冊</NavDropdown.Item> */}
                    <NavDropdown.Item>登出</NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <Container>
                    <Navbar.Brand href = "LogIn">登入</Navbar.Brand>
                    <Navbar.Brand href = "SignIn">註冊</Navbar.Brand>
                  </Container>
                )

                
              }
              
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>  
    )
}

export default NavigationBar;