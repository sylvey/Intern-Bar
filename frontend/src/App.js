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
  const [logInStatus, setLogInStatus] = useState(false);


  // store it to the local storage
  useEffect(() => {
    
    const fetchData = async ()=>{
      try {
        setUserId(JSON.parse(window.localStorage.getItem('userId')));
        setLogInStatus(JSON.parse(window.localStorage.getItem('logInStatus')));
      }catch(e){
        console.log(e);
      }
    }
    fetchData();
    console.log("userId", userId);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('userId', userId);
    window.localStorage.setItem('logInStatus', logInStatus);
    console.log('userId', userId);
  }, [userId, logInStatus])

  return (
    <Router>
      <div className="App">
          <NavigationBar login = {logInStatus}
                         setLogin = {setLogInStatus}
                         setUserId = {setUserId}
                         userId = {userId}/>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/SignIn" component={SignIn}/>
              <Route path = "/LogIn">
                <LogIn setUserId = {setUserId} 
                       userId = {userId}
                       setLogin = {setLogInStatus}/>
              </Route> 
              <Route path="/Collection">
                <Collection userId = {userId}/>
              </Route>
              <Route path="/MyPost" component={MyPost}/>
              <Route path="/Account">
                <Account userId = {userId}/>
              </Route> 
              <Route path="/PostDetail/:title" component={PostDetail}/>
              <Route path="/thisFile/:title" component={ThisFileCollection}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
