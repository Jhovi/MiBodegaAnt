import React from 'react';
import './App.css';
import { Login } from './general/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav } from './general/Nav';
import { AdmUsuario } from './usuarios/AdmUsuario';
import { SaveUsuario } from './usuarios/SaveUsuario';
import { AdmProducto } from './productos/AdmProducto';
import { EditUsuario } from './usuarios/EditUsuario';
import { AdmBoleta} from './boletas/AdmBoleta';
import { SaveBoleta} from './boletas/SaveBoleta';
import { Charts } from './general/Charts';
import AdmTableros from './tableros/adm-tableros.component';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="auth-wrapper">
        <Switch>
          <Route exact path="/" component={() => <Login/>} />
          <Route exact path="/adm-usuarios" component={() => <AdmUsuario/>} />
          <Route exact path="/save-usuario" component={() => <SaveUsuario/>} />
          <Route exact path="/adm-producto" component={() => <AdmProducto/>} />
          <Route exact path="/edit-usuario/:id" component={() => <EditUsuario/>} />
          <Route exact path="/adm-boletas" component={() => <AdmBoleta/>} />
          <Route exact path="/save-boleta" component={() => <SaveBoleta/>} />
          <Route exact path="/metrics" component={AdmTableros} />
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
