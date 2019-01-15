/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AppIntroSlider from 'react-native-app-intro-slider'
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import Routes from './Router'



export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false,
        };
    }

    renderApp = () => (
        <View style={{flex: 1}}>
            <Routes />
        </View>
    );

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name='right'
                    color='rgba(255, 255, 255, .9)'
                    size={24}
                    style={{ backgroundColor: 'transparent' }} />
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
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );

    };

    _onDone = () => {

        this.state({ showRealApp: true });
    };



    render() {
        if (this.state.showRealApp) {
            return (
                this.renderApp()
            );
        }
        else {
            return(
                <AppIntroSlider
                    slides={slides}
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                    />
            );
        }
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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

