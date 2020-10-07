import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './components/body/MainPage';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//Pages
import NotFoundPage from './components/pages/404';
import Champions from './components/pages/Champions';
import Header from './components/header/Header';
import TestPanel from './components/TestPanel';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Router>
      <div>
        <TestPanel />
        <Header />
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
}
