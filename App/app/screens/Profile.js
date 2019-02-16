import React, {Component} from 'react'
import {Card, Icon} from 'react-native-elements'
import {
    Image,
    ImageBackground,
    Linking,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';

import {connect, Provider} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../store/actions";

import {createStore} from 'redux';


import Email from '../components/Email';

import Separator from '../components/Separator';
import Tel from '../components/Telephone';

class Profile extends Component {


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
    

    onPressTel = number => {
        Linking.openURL(`tel://${number}`).catch(err =>
            console.log('Error:', err))
    };

    onPressSms = number => {
        Linking.openURL(`sms:${number}`).catch(err =>
            console.log('Error:', err))
    };

    onPressEmail = email => {
        Linking.openURL(`mailto:${email}`).catch(err =>
            console.log('Error:', err)
        )
    };

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.avatarSquare}>
                        <Image style={styles.avatar}
                               source={{uri: `${this.props.user.Avatar}`}} resizeMode='contain'/>
                    </View>

                    <Text style={styles.name}> {this.props.user.Name} {this.props.user.LastName}</Text>
                    <Text style={styles.userInfo}> {this.props.user.City} </Text>
                </View>
            </View>
        )
    };

    renderTel = () => {
        return (
            <Tel
                name={this.props.user.Name}
                number={this.props.user.Mobile}
                onPressSms={this.onPressSms}
                onPressTel={this.onPressTel}
            />
        )

    };


    renderEmail = () => {
        return (
            <Email
                key={`${this.props.user}`}
                name={this.props.user.Name}
                email={this.props.user.Email}
                onPressEmail={this.onPressEmail}
            />
        )
    };

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader()}
                        {this.renderTel()}
                        {Separator()}
                        {this.renderEmail()}
                    </Card>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    scroll: {
        backgroundColor: '#FFF',
    },

    container: {
        flex: 1,
    },


    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },


    emailContainer: {
        color: '#000',
        paddingTop: 30,
        alignItems: 'center',
    },
    telContainer: {
        color: '#000',
        paddingTop: 30,
        alignItems: 'center',
    },

    contact_container: {
        backgroundColor: '#FFF',
        margin: 20,
        //height: 150,
    },

    header: {
        backgroundColor: '#CC6666',
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        /* borderWidth: 4,*/
        transform: [{rotateZ: '20deg'}],
        /*borderColor: "#000",
        marginBottom: 50,*/
        flex: 1,
        alignItems: 'center',

    },
    avatarSquare: {
        width: 130,
        height: 130,
        transform: [{rotateZ: '-20deg'}],
        borderWidth: 4,
        borderColor: "#000",
        marginBottom: 50,
        backgroundColor: '#fff',

    },

    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },

    data_content: {
        backgroundColor: '#777',

    },


});

mapStateToProps = (state, props) => {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user
    }
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);