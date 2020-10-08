import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Application from './components/Application'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Application />
    );
  }
}
