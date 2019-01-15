import React, {Component, Fragment} from 'react'
import {View, Text, TextInput} from 'react-native'
import {RkTheme, RkButton, RkTextInput, RkText} from 'react-native-ui-kitten'

import {UtilStyles} from '../assets/styles'
import {Validate} from '../Helpers/Validation'

import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

export class Login extends Component {

    static navigationOptions = {
        title: ''
    };

    constructor(props) {
        super(props);

        this.state = {

            email: '',
            emailError: false,
            emailErrorMessage: '',

            password: '',
            passwordError: false,
            passwordErrorMessage: '',

            loading: false
        };
    }

    login() {

        this.setState({ error: '', loading: true });

        // NOTE HTTP is insecure, only post to HTTPS in production apps

        axios.post("http://localhost:4000/api/v1/sign_up",{
            user: {
                email: this.state.email,
                password: this.state.password,
            }
        },)
            .then((response) => {
                // Handle the JWT response here
                deviceStorage.saveItem('id_token', response.data.jwt);
            })
            .catch((error) => {
                // Handle returned errors here
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        //const { email, password, error, loading } = this.state;

        return (

            <View style={[UtilStyles.section, {backgroundColor: RkTheme.current.colors.input}]}>
                <View style={UtilStyles.rowContainer}>
                    <View style={{flex: 1}}>
                        <RkTextInput rkType='rounded' style={ this.state.emailError ? UtilStyles.errorInput : ''}
                                     placeholder='Login' keyboardType='email-address'
                                     onChangeText={ (email) => {
                                         this.setState({email: email});
                                         let v = Validate('email', email);
                                         this.setState({emailError: v[0], emailErrorMessage: v[1]})
                                     }}
                                     value={this.state.email}
                        />
                        {this.state.emailError && <RkText style={UtilStyles.errorMsg}>{this.state.emailErrorMessage}</RkText>}
                        <RkTextInput
                            secureTextEntry={true} style={ this.state.passwordError ? UtilStyles.errorInput : '' }
                            rkType='rounded' placeholder='Password'
                            onChangeText={ (password) => {
                            this.setState({password: password});
                            let v = Validate('password', password);
                            this.setState({passwordError: v[0], passwordErrorMessage: v[1]})
                        }}
                        />
                        {this.state.passwordError && <RkText style={UtilStyles.errorMsg}>{this.state.passwordErrorMessage}</RkText>}
                    </View>
                </View>
                <RkButton rkType='rounded xlarge' onPress={() => this.login()}>
                    Login
                </RkButton>
            </View>


        );
    }
}


