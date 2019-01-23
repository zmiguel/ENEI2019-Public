import React, {Component, Fragment} from 'react'
import {View, Text, TextInput, Image, ScrollView} from 'react-native'
import {RkTheme, RkButton, RkTextInput, RkText} from 'react-native-ui-kitten'

import {UtilStyles} from '../assets/styles'
import {Validate} from '../Helpers/Validation'

import axios from 'axios';
import deviceStorage from '../services/deviceStorage';


export default class Login extends Component {

    static  navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {

            formValid: false,

            email: '',
            emailError: false,
            emailErrorMessage: '',

            password: '',
            passwordError: false,
            passwordErrorMessage: '',

            loading: false
        };


    }


    _validatelogin = (email, password) => {
        let valid = null;

        let v = Validate('email', email);
        this.setState({emailError: v[0], emailErrorMessage: v[1]});

        v = Validate('password', password);

        // setState is asynchronous and so trying to work with state directly after a setState
        // call won't work as the update won't necessarily have run. Instead you can use the second argument to setState which is a callback
        this.setState({passwordError: v[0], passwordErrorMessage: v[1]}, function () {

            console.log('Email error: ' + this.state.emailError + '  Pass Error: ' + this.state.passwordError);

        });

        if (this.state.emailError && this.state.passwordError)
            this.setState({formValid: false});
        else
            this.setState({formValid: true});
    };


    login() {
        const {email, password, formValid} = this.state;
        this.setState({loading: true});

        this._validatelogin(email, password);

        console.log(formValid);

        if (formValid) {

            axios.post("https://reqres.in/api/login", {

                email: email,
                password: password

            }) //https://reqres.in/api/login email: email, password: password,
                .then(response => {
                    console.log(response)
                    // Save Token
                    deviceStorage.saveItem('userToken', response.data.token);

                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    render() {
        //const { email, password, error, loading } = this.state;

        return (
            <ScrollView>
                <View style={[UtilStyles.section, {backgroundColor: RkTheme.current.colors.input}]}>
                    <Image style={UtilStyles.loginImage}
                           source={require('../assets/img/logo.png')}
                    />

                    <View style={UtilStyles.rowContainer}>
                        <View style={{flex: 1}}>
                            <RkTextInput rkType='rounded' style={this.state.emailError ? UtilStyles.errorInput : ''}
                                         placeholder='Login' keyboardType='email-address'
                                         onChangeText={(email) => {
                                             this.setState({email: email});
                                         }}
                                         value={this.state.email}
                            />
                            {this.state.emailError &&
                            <RkText style={UtilStyles.errorMsg}>{this.state.emailErrorMessage}</RkText>}
                            <RkTextInput
                                secureTextEntry={true} style={this.state.passwordError ? UtilStyles.errorInput : ''}
                                rkType='rounded' placeholder='Password'
                                onChangeText={(pass) => {
                                    this.setState({password: pass});
                                }}
                                value={this.state.password}

                            />
                            {this.state.passwordError &&
                            <RkText style={UtilStyles.errorMsg}>{this.state.passwordErrorMessage}</RkText>}
                        </View>
                    </View>
                    <RkButton style={{marginTop: 30}} rkType='rounded xlarge' onPress={() => this.login()}>
                        Login
                    </RkButton>
                </View>
            </ScrollView>

        );
    }
}


