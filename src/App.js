import React from 'react';
import './App.css';
import { Login } from './general/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav } from './general/Nav';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="auth-wrapper">
        <Switch>
          <Route exact path="/login" component={() => <Login/>} />

        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
