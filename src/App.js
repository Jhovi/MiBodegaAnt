import React from 'react';
import './App.css';
import { Login } from './general/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav } from './general/Nav';
import { AdmUsuario } from './usuarios/AdmUsuario';
import { SaveUsuario } from './usuarios/SaveUsuario';
import { AdmProducto } from './productos/AdmProducto';
import { EditUsuario } from './usuarios/EditUsuario';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="auth-wrapper">
        <Switch>
          <Route exact path="/login" component={() => <Login/>} />
          <Route exact path="/adm-usuarios" component={() => <AdmUsuario/>} />
          <Route exact path="/save-usuario" component={() => <SaveUsuario/>} />
          <Route exact path="/adm-producto" component={() => <AdmProducto/>} />
          <Route exact path="/edit-usuario/:id" component={() => <EditUsuario/>} />
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
