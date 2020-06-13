import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from './components/BubblePage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <button>
            <Link to='/'>Login</Link>
          </button>
          <button>
            <Link to='/protected'>Protected</Link>
          </button>
        </nav>
        <Switch>
          <PrivateRoute exact path='/protected' component={BubblePage} />
          <Route exact path="/" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
