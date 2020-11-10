import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import StartPage from "./StartPage";
//Pages
import NotFoundPage from "./pages/404";
import Champions from "./pages/Champions";
import RouteTest from "./RouteTest";
import LiveGame from "./LiveGame/LiveGame";

const Application = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/Summoner/:userId" component={MainPage} />
          <Route exact path="/LiveGame/:userId" component={LiveGame} />
          {/* <Route exact path="/RouteTest/:userId" component={RouteTest} /> */}
          <Route exact path="/404" component={NotFoundPage} />
          <Route exact path="/champions" component={Champions} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
  );
};

export default Application;
