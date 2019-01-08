import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as Screens from './screens';

const ExplorerApp = createStackNavigator({
    Home: { screen: Screens.Home },
    Login: { screen: Screens.Login}

});

export default createAppContainer(ExplorerApp);
