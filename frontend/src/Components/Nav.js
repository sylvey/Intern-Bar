import React from "react";
import { Nav, Navbar, Container, NavDropdown, NavbarBrand } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router";
import logInButton from "../image/LogInButton.png";
import RegisterButton from "../image/RegisterButton.png"
import axios from "axios";

const NavigationBar = ({userId, setUserId, login, setLogin}) =>{

    // const [userId, setUserId] = useState(window.sessionStorage.getItem('userId'))
    const history = useHistory();
    const handleNavigate = ()=>history.push("/");

    async function handleLogOut(){
      let res;
      try{
        res = await axios.post("http://127.0.0.1:8000/api/user/logout",{
          user_id: window.sessionStorage.getItem('userId'),
        });

        if(res.status === 200){
          setUserId("");
          setLogin(false);
          console.log(userId)
          window.sessionStorage.clear();
          window.sessionStorage.setItem('userId', "");
          handleNavigate();
          // window.sessionStorage.setItem('logInStatus', false);
        }

      }catch(e){
        console.log(e);
      }
    }

    return (
        // collapseOnSelect expand="lg"
        <Navbar expand="lg" bg="light" variant="light">
          <Container>
          <Navbar.Brand href="/">Intern Bar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              {/* <Navbar.Brand>實習職務</Navbar.Brand>
              <Navbar.Brand>活動資訊</Navbar.Brand>
              <Navbar.Brand>關於</Navbar.Brand> */}
            </Nav>
            <Nav>
              {
                login?(
                  <NavDropdown title={userId} id="collasible-nav-dropdown">
                    <NavDropdown.Item href = "/Account">個人檔案</NavDropdown.Item>
                    <NavDropdown.Item href = "/MyPost">我的貼文</NavDropdown.Item>
                    <NavDropdown.Item href = "/Collection">珍藏項目</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {/* <NavDropdown.Item href = "/LogIn">登入</NavDropdown.Item> */}
                    {/* <NavDropdown.Item href="/SignIn">註冊</NavDropdown.Item> */}
                    <NavDropdown.Item onClick = {handleLogOut}>登出</NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <Nav>
                    <Navbar.Brand href = "LogIn">
                        <img src={logInButton}
                             width = "120vh"
                             height = "95%"/>
                    </Navbar.Brand>
                    <Navbar.Brand href = "SignIn">
                       <img src={RegisterButton}
                             width = "120vh"
                             height = "95%"/>
                    </Navbar.Brand>
                  </Nav>
                )

                
              }
              
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>  
    )
}

export default NavigationBar;