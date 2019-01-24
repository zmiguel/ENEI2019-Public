import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import {RkButton,
    RkTheme } from 'react-native-ui-kitten';

import deviceStorage from '../services/deviceStorage';

export class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };


    _deleteToken = () => {
        deviceStorage.deleteJWT();
    };


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex:1, alignItems: 'center', alignContent: 'center'}}>
               <RkButton onPress= { () => this._deleteToken() }>Apagar Token</RkButton>
            </View>
        );
    }
}