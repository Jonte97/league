import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import Content from './components/Content';

export default class App extends Component {
  displayName = App.name

  render() {
    return (

      <Content />
      // <Layout>
      //   <Route exact path='/' component={Home} />
      //   <Route path='/counter' component={Counter} />
      //   <Route path='/fetchdata' component={FetchData} />
      // </Layout>
    );
  }
}
