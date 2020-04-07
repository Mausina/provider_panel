import React from 'react';
import './App.css';
import { ProtectedRoute } from "../common/protected.route";
import {Route, Switch} from "react-router-dom";
import {AppLayout} from "../common/header";
import {LandingPage} from "../common/landing.page";
import NotFound from "../common/404";
import auth from '../auth/auth'

// eslint-disable-next-line no-unused-vars
let instas = new auth();



function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
              <LandingPage auth={instas}/>
          )}/>
          <ProtectedRoute exact path="/app" render={() => (
              <AppLayout auth={instas}/>
          )}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
  );
}

export default App;
