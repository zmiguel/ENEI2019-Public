
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


import Eventos from './screens/Eventos'

import Social from './screens/Social'
import Scan from './screens/Scan'

import Calendar from './screens/Calendar'

import Icon from "react-native-vector-icons/Ionicons"



const AppStack = createBottomTabNavigator(
    {
        Calendar:{
            screen:Calendar,

            navigationOptions: {
                
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-beer" size={30}/>
                  )
              },
        },
        Social:{
            screen:Social,

            navigationOptions: {
                
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-mail" size={30}/>
                  )
              },
        },
        Scan:{
            screen:Scan,

            navigationOptions: {
                
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-qr-scanner" size={30}/>
                  )
              },
        },
         Eventos: { 
             screen: Eventos,

             navigationOptions: {
                
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-beer" size={30}/>
                  )
              },
        },
        
        Home: {
            screen:Screens.Home,
            navigationOptions: {
                  
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" size={30}/>
                    )
            },
        },
         

        },{
            initialRouteName : 'Home'
        }
)

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

