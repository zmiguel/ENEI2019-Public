import React, {Component} from 'react'
import {Card, Divider} from 'react-native-elements'
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
    TouchableOpacity,
    Dimensions,
    TextInput,
    Button
} from 'react-native'
import PropTypes from 'prop-types';

import {connect, Provider} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../store/actions";

import {createStore} from 'redux';


import Email from '../components/Email';

import Separator from '../components/Separator';
import Tel from '../components/Telephone';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons"


import Swiper from 'react-native-swiper';

class editCalendar extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Editar Calendário',
        headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    constructor(props) {

        super(props);

        this.state = {
            token: false,
            tokenData: '',
            loggedIn: false,
            onHold: true,
            user: {},
            cenas: {Name: 'as'},
            text: '',
        };

    }

    render() {
        return (
            <ScrollView>
                <View styles={styles.header}>
                    <View style={styles.carreerPath}>
                        <Text style={styles.carreerPathText}>Carreer Paths</Text>
                    </View>
                    <View style={styles.carreerPathDescription}>
                        <Text>Nesta edição do enei vai ser possível aos participantes ecolherem uma área</Text>

                    </View>
                    <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('Profile')}>
                        <Text>Escolher path</Text>
                    </TouchableOpacity>


                </View>
                <View>

                </View>

            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({

    header: {
        flex: 1,
        height: SCREEN_HEIGHT * 0.1,
        backgroundColor: 'red'
    },
    carreerPath: {
        flex: 1,

        backgroundColor: '#CC1A17',
        height: SCREEN_HEIGHT * 0.1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    carreerPathText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'

    },
    carreerPathDescription: {
        padding: 10,
        marginBottom: 100
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }


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

export default connect(mapStateToProps, mapDispatchToProps)(editCalendar);