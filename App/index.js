/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './app/App';
import {name as appName} from './app.json';




AppRegistry.registerComponent(appName, () => App);
