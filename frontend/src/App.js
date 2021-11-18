import logo from './logo.svg';
import React, {Component, useState, useEffect} from 'react';
import NavigationBar from './Components/Nav';
import './csses/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import SignIn from './pages/signIn';
import LogIn from './pages/logIn';
import Collection from './pages/collection';
import MyPost from './pages/myPost';
import Account from './pages/account';
import PostDetail from './pages/postDetail';
import ThisFileCollection from './pages/thisFileCollection';


function App() {
  
  const [userId, setUserId] = useState("");
  const [login, setLogin] = useState(false);


  // fetch from local storage
  useEffect(() => {
    console.log("i am here");
    const fetchData = async ()=>{
      try {
        if(window.sessionStorage.getItem('userId'))
        {
          setUserId(window.sessionStorage.getItem('userId'));
          setLogin(window.sessionStorage.getItem('userId') !== "")
        }
        else
        {
          setUserId("");
          setLogin(false);
        }
        
      }catch(e){
        console.log(e);
      }
    }
    fetchData();
    // console.log("userId", userId);
  }, []);

  

  return (
    <Router>
      <div className="App">
          <NavigationBar userId = {userId}
                         setUserId = {setUserId}
                         login = {login}
                         setLogin = {setLogin}/>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/SignIn" component={SignIn}/>
              <Route path = "/LogIn">
                <LogIn setUserId = {setUserId} 
                       userId = {userId}
                       login = {login}
                       setLogin = {setLogin}/>
              </Route> 
              <Route path="/Collection">
                <Collection/>
              </Route>
              <Route path="/MyPost">
                <MyPost/>
              </Route>
              <Route path="/Account">
                <Account/>
              </Route> 
              <Route path="/PostDetail/:title" component={PostDetail}/>
              <Route path="/thisFile/:title" component={ThisFileCollection}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
