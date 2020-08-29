import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header/Header';
import Body from './components/body/Body';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//Pages
import NotFoundPage from './components/pages/404';
import Champions from './components/pages/Champions';

const MainPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment>
  );
};

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Player</Link>
            </li>
            <li>
              <Link to="/champions">Champions</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/404" component={NotFoundPage} />
          <Route exact path="/champions" component={Champions}></Route>
          <Redirect to="/404"/>
        </Switch>
      </div>
    </Router>
    );
  }
}
