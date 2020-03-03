import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import 'bootstrap/dist/css/bootstrap.min.css';

import Content from './components/Content';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Route exact path='/' component={Content} />
    );
  }
}
