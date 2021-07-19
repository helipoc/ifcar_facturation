import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Client from './components/Client';
import Facturation from './components/Facturation';
import Ajouter from './components/Facturation/AjouterFacture';
import Gerer from './components/Facturation/Gerer';
import Stat from './components/Stat';
import connect from './db/connect';
connect();
const Hello = () => {
  return (
    <div className="container" style={{ height: '80vh' }}>
      <div className="row mb-5 mt-5">
        <div className="col mb-5">
          <h1 className="display-1 d-flex justify-content-center text-secondary">
            IFCAR Facturation
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col mb-5  d-flex justify-content-center">
          <Link to="/clients">
            <button className="btn btn-success" style={{ width: '8em' }}>
              Clients
            </button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Link to="/facturation">
            <button
              className="btn btn-primary"
              style={{ marginRight: '8em', width: '8em' }}
            >
              Facturation
            </button>
          </Link>
          <Link to="/stat">
            <button className="btn btn-warning" style={{ width: '8em' }}>
              Statistiques
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/clients" component={Client} />
        <Route path="/facturation/ajouter" exact component={Ajouter} />
        <Route path="/facturation/manage" exact component={Gerer} />
        <Route path="/facturation" component={Facturation} />
        <Route path="/stat" component={Stat} />
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
