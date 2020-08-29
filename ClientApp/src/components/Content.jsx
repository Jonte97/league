import React from "react";
import Header from './header/Header';
import Body from './body/Body';
import Footer from './footer/Footer';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//Pages
import NotFoundPage from './pages/404';
import Champions from './pages/Champions';

const MainPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment>
  );
};


const Content = () => {
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
          {/* <Redirect to="/champions"/> */}
        </Switch>
      </div>
    </Router>
  );
};

export default Content;
