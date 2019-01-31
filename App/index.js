/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import {name as appName} from './app.json';

import store from './app/store'; //Import the store


import App from './app/App' //Import the component file

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);


AppRegistry.registerComponent(appName, () => RNRedux);

