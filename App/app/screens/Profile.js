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
import * as Actions from "../actions";

import {createStore} from 'redux';


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
/*
        state = {
            telDS: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }).cloneWithRows(this.props.tels),
            emailDS: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }).cloneWithRows(this.props.emails),
        };
*/


    onPressPlace = () => {
        console.log('place')
    };

    onPressTel = number => {
        Linking.openURL(`tel://${number}`).catch(err =>
            console.log('Error:', err))
    };

    onPressSms = () => {
        console.log('sms')
    };

    onPressEmail = email => {
        Linking.openURL(`mailto:${email}-+`).catch(err =>
            console.log('Error:', err)
        )
    };

    renderHeader = () => {
        /*  const {
              avatar,
              avatarBackground,
              name,
              address: {city, country},
          } = this.props;*/

        return (
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                           source={{uri: `${this.props.user.Avatar}`}}/>

                    <Text style={styles.name}> {this.props.user.Name} {this.props.user.LastName}</Text>
                    <Text style={styles.userInfo}> {this.props.user.City} </Text>
                </View>
            </View>
        )
    };

    renderTel = () => {

        return (
            <View style={styles.telContainer}>
                <TouchableOpacity onPress={() => this.onPressTel(`${this.props.user.Mobile}`)}>
                    <Text>{this.props.user.Mobile}</Text>
                </TouchableOpacity>
            </View>
        )
    };
    /* <ListView
                contentContainerStyle={styles.telContainer}
                /*dataSource={this.state.telDS}

        renderRow = {({id, name, number}, _, k)
    =>
        {
        }
    }
        />}*/


    renderEmail = () => {
        return (
            <View styles={styles.emailContainer}>
                <TouchableOpacity onPress={() => this.onPressEmail(`${this.props.user.Email}`)}>
                    <Text>{this.props.user.Email} </Text>
                </TouchableOpacity>
            </View>
        )

        /*  <ListView
              contentContainerStyle={styles.emailContainer}
              /*dataSource={this.state.emailDS}
              renderRow={({email, id, name}, _, k) => {

              }}
          />*/
    };

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    {this.renderHeader()}
                    <View style={styles.body}>
                        {this.renderTel()}
                        {this.renderEmail()}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    scroll: {
        backgroundColor: '#FFF',
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },

    header: {
        backgroundColor: "#DCDCDC",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },


});

mapStateToProps = (state, props)  => {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user
    }
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);