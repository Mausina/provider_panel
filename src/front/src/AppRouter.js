import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ProtectedRoute} from './components/Protected.route'
import LoginComponent from "./components/auth/Login";
import PersistentDrawerLeft from "./components/pages/main-page";

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route exact path="/main" component={ProtectedRoute(PersistentDrawerLeft)}/>
                <Route path="*" component={() => "404 NOT FOUND"}/>
            </Switch>
        </Router>
    )
};

export default AppRouter;