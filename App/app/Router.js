import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import * as Screens from './screens';


import AuthLoadingScreen from './screens/AuthLoading'

import Eventos from './screens/Eventos'

import Social from './screens/Social'
import Scan from './screens/Scan'

import Calendar from './screens/Calendar'
import Home from './screens/Home'



/*Icons*/
import Icon from "react-native-vector-icons/Ionicons"
import IconF from "react-native-vector-icons/Foundation"
import IconFA from "react-native-vector-icons/FontAwesome5"
import Profile from "./screens/Profile";


const AppStack = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {

                tabBarIcon: ({tintColor}) => (
                    <Icon name="md-home" color={tintColor} size={30}/>
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

        Calendar: {
            screen: Calendar,

            navigationOptions: {

                tabBarIcon: ({tintColor}) => (
                    <IconF name="calendar" color={tintColor} size={30}/>
                )
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

const Stack = createStackNavigator({
    tabs: {
        screen: AppStack,
        navigationOptions: ({navigation}) => {
            const index = navigation.state.index;

            if (navigation.state.routes[index].routeName !== 'Scan') {
                return {
                    headerTitle: `${navigation.state.routes[index].routeName}`,
                    headerRight: (
                        <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('Profile')}>
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
    },
    Profile: {
        screen: Profile
    }

});


export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: Stack,
        

    },
    {
        initialRouteName: 'App'
    })
);

