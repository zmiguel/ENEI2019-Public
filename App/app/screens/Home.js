import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import {RkButton,
    RkTheme } from 'react-native-ui-kitten';

export class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{
                flex: 1,
                alignItems:'center',
                justifyContent:'center'
            }}>
               <RkButton title="Go to Login screen"
                        onPress={() => this.props.navigation.navigate('Login')}/>
            </View>
        );
    }
}