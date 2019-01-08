/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import Routes from './Router'

export default class App extends Component {

    state = {
        loaded: false,
    };

    renderApp = () => (
        <View style={{ flex: 1 }}>
            <Routes />
            <StatusBar />
        </View>
    );

  render() {
    return (
      this.renderApp()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
