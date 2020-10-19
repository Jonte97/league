import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import MainPage from './MainPage/MainPage';
//Pages
import NotFoundPage from './pages/404';
import Champions from './pages/Champions';

const Application = () => {

    return (
        <Router>
            <div>
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