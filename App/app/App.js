/**
 * Enei 2019 React Native App
 *
 * João Borges
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AppIntroSlider from 'react-native-app-intro-slider'

import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import deviceStorage from '././services/deviceStorage'

import Router from './Router'
import Login from './screens/Login'
import {AsyncStorage, ActivityIndicator} from 'react-native';
import AuthLoadingScreen from "./screens/AuthLoading";
import {getToken} from "./Helpers/Requests";



import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { compose, createStore, combineReducers, applyMiddleware} from 'redux';
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });


function configureStore(initialState) {
    const enhancer = compose(
      applyMiddleware(
        thunkMiddleware, // used to dispatch() functions
        loggerMiddleware, // used for logging actions
      ),
    );
    return createStore(reducer, initialState, enhancer);
  }


const store = configureStore({});
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstLogin: null,
            jwt: '',
            loading: true
        };
    }

    newJWT(jwt) {
        this.setState({
            jwt: jwt
        });
    }

    //componentDidMount() is invoked immediately after a component is mounted

    componentDidMount() {

    console.log('oi - ' + getToken('TC2MT8QFJT', '80f3b6e5'));

    }


//Buttons do Intro Slider
    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name='right'
                    color='rgba(255, 255, 255, .9)'
                    size={24}
                    style={{backgroundColor: 'transparent'}}/>
            </View>
        );
    };

    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name='check'
                    color='rgba(255, 255, 255, .9)'
                    size={24}
                    style={{backgroundColor: 'transparent'}}
                />
            </View>
        );

    };

//--Buttons do Intro Slider

    render() {

    

        return (
   
            <Provider store={store}>
                <Router />
                </Provider>
        )


        /* if (this.state.loading) {
         }
         else {

             if (this.state.firstLaunch) {
                 return (
                     <AppIntroSlider
                         slides={slides}
                         renderDoneButton={this._renderDoneButton}
                         renderNextButton={this._renderNextButton}
                         onDone={() => this.setState({firstLaunch: false})}
                     />
                 );
             }
             else if (!this.state.firstLaunch && !this.state.jwt) {    //&& !this.state.jwt}
                 return (
                     <View style={{flex: 1}}>
                         <Login/>
                     </View>
                 )
             }
             else { // !this.state.firstLaunch && this.state.jwt
                 return (
                     <View style={{flex: 1}}>
                         <Routes />
                     </View>
                 )
             }*/
    }
}


//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 320,
        height: 320,
    }
});


//Introducing Slides
const slides = [
    {
        key: 'somethun',
        title: 'Welcome ENEI\'19',
        text: 'Description.\nSay something cool',
        image: {
            uri: 'http://aboutreact.com/wp-content/uploads/2018/08/mobile_recharge.png'
        },
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: //require('./assets/2.jpg'),
            {
                uri: 'http://aboutreact.com/wp-content/uploads/2018/08/flight_ticket_booking.png'
            },
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: {
            uri: 'http://aboutreact.com/wp-content/uploads/2018/08/best_deals1.png'
        },
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    }
];

