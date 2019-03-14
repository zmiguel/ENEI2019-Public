import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {UtilStyles} from '../assets/styles'

export default class resetPassword extends Component {

    constructor() {
        super();
        this._bootstrapAsync();
    }

  

    // Render Loading
    render() {
        return (
            <View style={UtilStyles.containerLoading}>
               <Text>Reset Password</Text>
            </View>
        );
    }
}