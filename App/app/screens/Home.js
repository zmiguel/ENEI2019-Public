import React, {Component} from 'react';
import {Button, View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {
    RkButton,
    RkTheme
} from 'react-native-ui-kitten';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions'; //Import your actionss
import Counter from './Counter'
import {createStore} from 'redux';
import {Provider} from 'react-redux'


class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
            token: false,
            tokenData: '',
            loggedIn: false,
            onHold: true,
            user: {}
        };


    }

    componentDidMount() {


        //this.props.logoutUser();

        this.props.getUserInfo();

        console.log('logged:' + this.props.loggedIn);

        console.log('there we go')

        console.log(this.props.user)
    }

    bClick() {

        //this.props.logoutUser();

        //var navigate  = this.props.navigation.navigate
    }

    _logout = () => {
        console.log("asdasd");
        //  this.props.navigation.navigate('scan');
        this.props.getUserInfo();
        // this.props.logout();
        this.props.logoutUser();
    }

    render() {
        console.log(this.props.token);
        const {navigate} = this.props.navigation;
        if (this.props.token) {

            console.log(this.props.user)
            return (
                <View>
                    <Button onPress={this._logout} title="LOGOUT"/>
                    <Text></Text>
                    <Text>Nome: {this.props.user.Email}</Text>
                    <Text>city: {this.props.user.City}</Text>
                    <Text>phone: {this.props.user.Mobile}</Text>


                </View>
            );
        }
        else {
            return (
                <View>
                    <Text>sem permissões para aceder aqui</Text>

                </View>
            );
        }


    }

    renderItem({item, index}) {
        return (
            <View>
                <Text>
                    {(parseInt(index) + 1)}{". "}{item.title}
                </Text>
                <Text>
                    {item.description}
                </Text>
            </View>
        )


    }

}


function mapStateToProps(state, props) {

    return {


        token: state.apiReducer.token,
        user: state.apiReducer.user


    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);