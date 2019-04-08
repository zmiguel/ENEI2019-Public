import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,

} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator,
    HeaderBackButton
} from 'react-navigation';
import * as Screens from './screens';

/*Icons*/
import Icon from "react-native-vector-icons/Ionicons"
import IconF from "react-native-vector-icons/Foundation"
import IconFA from "react-native-vector-icons/FontAwesome5"


import AuthLoadingScreen from './screens/AuthLoading'

import Eventos from './screens/Eventos'

import Jogo from './screens/Jogo'
import Scan from './screens/Scan'

import Calendar from './screens/Calendar'
import Home from './screens/Home'


import Profile from "./screens/Profile";
import editCalendar from './screens/editCalendar';
import choosePath from './screens/choosePath';
import calendarDetail from './screens/calendarDetail';

//import resetPassword from './screens/resetPassword';

import eventDetail from './screens/eventDetail';

import teamDetail from './screens/teamDetail';

import event from './screens/event';

const navigationOptions = ({navigation}) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
    headerStyle: {backgroundColor: 'transparent', zIndex: 100 },

});


const AppStack = createBottomTabNavigator(
    {
        Calendário: {
            screen: Calendar,

            navigationOptions: {

                tabBarIcon: ({tintColor}) => (
                    <IconF name="calendar" color={tintColor} size={30}/>
                )
            },
        },

        'Jogo': {
            screen: Jogo,

            navigationOptions: {

                tabBarIcon: ({tintColor}) => (

                    <Image style={{width: 30, height: 30}} source={require('./assets/img/logo2.png')}></Image>
                )
            },
        },

        Scan: {
            screen: Scan,

            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="ios-qr-scanner" color={tintColor} size={30}/>
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
                    <Icon name="ios-person" color={tintColor} size={30}/>
                )
            },
        },


    },
    {
        initialRouteName: 'Home',


        tabBarOptions: {
            showLabel: true, // hide labels
            activeTintColor: '#CC1A17', // active icon color
            inactiveTintColor: 'black',  // inactive icon color
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
            
          
            if (navigation.state.routes[index].routeName == 'Home') {
                return {
                    headerTitle: `${navigation.state.routes[index].routeName}`,
                    headerRight: (
                        <TouchableOpacity style={{marginRight: 20, flex: 1, flexDirection: 'row'}}
                                          onPress={() => navigation.navigate('Profile')}>

                            <Text style={{marginRight:5}}>Editar dados</Text>
                            <IconFA name="user-edit" size={22}/>

                        </TouchableOpacity>
                    )
                }
            }
            
            if (navigation.state.routes[index].routeName == 'Jogo') {
                return {
                    header: (<View style={{backgroundColor:'#CC1A17', padding:15}}>
                        <Text style={{textAlign:'center', alignSelf:'center', color:'white', fontSize:20, fontWeight:'bold'}}>Jogo do ENEI'19</Text>
                    </View>)
                 
                       
                    
                }
            }
            else if (navigation.state.routes[index].routeName == 'Calendário') {
                return {
                    headerTitle: 'Calendário',
                    headerRight: (
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          
                        

                            <TouchableOpacity style={{marginRight: 20, flex: 1, flexDirection: 'row'}}
                                              onPress={() => navigation.navigate('choosePath')}>
                                <Text style={{color:'#CC1A17', marginRight:5}}>Inscrições</Text>
                                <IconFA name="user-edit" size={22} color={'#CC1A17'}/>
                            </TouchableOpacity></View>

                    )
                }
            }
            else if (navigation.state.routes[index].routeName == 'choosePath') {
                return {
                    headerTitle: 'Calendário',
                    headerRight: (
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity style={{marginRight: 20, flex: 1, flexDirection: 'row'}}
                                              onPress={() => navigation.navigate('Edit')}>
                                <Text>FAQ</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={{marginRight: 20, flex: 1, flexDirection: 'row'}}
                                              onPress={() => navigation.navigate('choosePath')}>
                                <Text>Escolher</Text>
                                <IconFA name="user-edit" size={22}/>
                            </TouchableOpacity></View>

                    )
                }
            }
            else if (navigation.state.routes[index].routeName == 'Eventos') {
                return {
                    headerTitle: 'Eventos',
                }

            }
            else {
                return {
                    header: null
                }
            }
        }
    },
    Profile: {
        screen: Profile
    },
    Edit: {
        screen: editCalendar
    },
    choosePath: {
        screen: choosePath
    },
    calendarDetail: {
        screen: calendarDetail,
    },
    eventDetail: {
        screen: eventDetail,
    },
    teamDetail:{
        screen: teamDetail,
    },

    
    event:{
        screen: event
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

