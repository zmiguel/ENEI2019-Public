
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
import Home from './screens/Home'
import logout from './screens/logout'



/*Icons*/
import Icon from "react-native-vector-icons/Ionicons"
import IconF from "react-native-vector-icons/Foundation"
import IconFA from "react-native-vector-icons/FontAwesome5"


const AppStack = createBottomTabNavigator(
    {
       

        Calendar: {
            screen: Calendar,

            navigationOptions: {

                tabBarIcon: ({tintColor}) => (
                    <IconF name="calendar" color={tintColor} size={30}/>
                )
            },
        },
        Social: {
            screen: Social,

            navigationOptions: {

                tabBarIcon: ({tintColor}) => (
                    <Icon name="ios-mail" color={tintColor} size={30}/>
                )
            },
        },
        Scan: {
            screen: Scan,

            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="ios-qr-scanner" color={tintColor} size={45}/>
                ),
            },
        },
     

        Eventos: {
            screen: Eventos,

            navigationOptions: {

                tabBarIcon: ({tintColor}) => (
                    <Icon name="ios-beer" color={tintColor} size={30}/>
                )
            },
        },
        Home: {
            screen: Home,
            navigationOptions: {

                tabBarIcon: ({tintColor}) => (
                    <Icon name="md-home" color={tintColor} size={30}/>
                )
            },
        },

    },
    {
        initialRouteName: 'Home',

        tabBarOptions: {
            showLabel: false, // hide labels
            activeTintColor: '#858683', // active icon color
            inactiveTintColor: '#d8d6c9',  // inactive icon color
            style: {
                backgroundColor: '#fff' // TabBar background
            }
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

    const Stack = createStackNavigator({
        tabs: {
            screen: AppStack,
            navigationOptions: ({navigation}) => {
                const index = navigation.state.index;
    
                if (navigation.state.routes[index].routeName !== 'Scan') {
                    return {
                        headerTitle: `${navigation.state.routes[index].routeName}`,
                        headerRight: (
                            <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('Home')}>
                                <IconFA name="user-edit" size={22}/>
                            </TouchableOpacity>
                        )
                    }
                } else {
                    return {
                        header: null
                    }
                }
            }
        }
    
    });


export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
        
    },
    {
        initialRouteName: 'App'
    })
);

