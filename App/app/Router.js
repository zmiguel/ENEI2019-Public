import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import * as Screens from './screens';
import Login from './screens/Login'
import AuthLoadingScreen from './screens/AuthLoading'

const AppStack = createBottomTabNavigator(
    {
        Home: {
            screen: Screens.Home
        }
    }
);

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
    },
    /*{
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }*/

    );


export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    })
);

