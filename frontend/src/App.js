import logo from './logo.svg';
import React, {Component} from 'react';
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
  return (
    <Router>
      <div className="App">
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/SignIn" component={SignIn}/>
            <Route path="/LogIn" component={LogIn}/>
            <Route path="/Collection" component={Collection}/>
            <Route path="/MyPost" component={MyPost}/>
            <Route path="/Account" component={Account}/>
            <Route path="/PostDetail/:title" component={PostDetail}/>
            <Route path="/thisFile/:title" component={ThisFileCollection}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
