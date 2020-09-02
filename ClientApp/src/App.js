import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SideMenu from './components/sideMenu/SideMenu';
import MainPage from './components/body/MainPage';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//Pages
import NotFoundPage from './components/pages/404';
import Champions from './components/pages/Champions';
import Header from './components/Header/Header';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Router>
      <div>
        <Header />
        <SideMenu />
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
