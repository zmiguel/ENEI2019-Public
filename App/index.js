/** @format */
import React from 'react';
import {AppRegistry, View,Text} from 'react-native';
import {Provider} from 'react-redux';

import {name as appName} from './app.json';

import {PersistGate} from 'redux-persist/integration/react'


import App from './app/App' //Import the component file


import {store, persistor}   from "./app/store/store";

rendeLoading=()=>{
  <View>
    <Text>loading........</Text>
  </View>
}
const RNRedux = () => (
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={this.rendeLoading()}>
    <App />
    </PersistGate>
   
  
    </Provider>
);


AppRegistry.registerComponent(appName, () => RNRedux);

