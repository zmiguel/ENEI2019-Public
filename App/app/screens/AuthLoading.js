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

export default class AuthLoadingScreen extends Component {

    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(token ? 'App' : 'Auth');
    };



    // Render Loading
    render() {
        return (
            <View style={UtilStyles.containerLoading}>
                <ActivityIndicator size='large' color="rgba(000,000,000,1)"/>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}