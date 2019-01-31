import React, {Component} from 'react';
import {Button, View, Text, TouchableOpacity} from 'react-native';
import {
    RkButton,
    RkTheme
} from 'react-native-ui-kitten';

import deviceStorage from '../services/deviceStorage';
import AuthLoadingScreen from './AuthLoading';
import api from '../services/api';


import Counter from './Counter'
import {createStore} from 'redux';
import {Provider} from 'react-redux'

const initialState = {

    counter: 0
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'INCREASE_COUNTER':
            return {
                counter: state.counter + 1
            }

        case 'DECREASE_COUNTER':
            return {
                counter: state.counter - 1
            }
    }

    return state
};

const store = createStore(reducer);


export class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };


    render() {


        return (
            <Provider store={store}>
                <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
                    <Counter></Counter>


                </View>

            </Provider>

        );
    }
}