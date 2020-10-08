import React from 'react'
import MainPage from './body/MainPage';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//Pages
import NotFoundPage from './pages/404';
import Champions from './pages/Champions';
import TestPanel from './TestPanel';

const Application = () => {

    return (
        <Router>
            <div>
                <TestPanel />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/404" component={NotFoundPage} />
                    <Route exact path="/champions" component={Champions}></Route>
                    {/* <Redirect to="/404"/> */}
                </Switch>
            </div>
        </Router>
    );
}

export default Application;