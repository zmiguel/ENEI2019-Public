import React, {Component} from 'react'
import {Card, Divider,} from 'react-native-elements'
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
    Button,
} from 'react-native'
import PropTypes from 'prop-types';

import {connect, Provider} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../store/actions";

import {Validate} from '../Helpers/Validation'
import {RkTextInput} from 'react-native-ui-kitten';

import {createStore} from 'redux';


import Email from '../components/Email';

import Separator from '../components/Separator';
import Tel from '../components/Telephone';


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons"

class Profile extends Component {


    constructor(props) {

        super(props);

        this.state = {
            name:this.props.user.Name,
            userDetails:{},
            token: false,
            tokenData: '',
            loggedIn: false,
            onHold: true,
            user: {},
            cenas: {Name: 'as'},
            text: '',


            formValid: true,

            jobs: this.props.user.Company,
            jobsError: false,
            jobsErrorMessage: '',

            email: this.props.user.Email,
            emailError: false,
            emailErrorMessage: '',

            phone: this.props.user.Mobile,
            phoneError: false,
            phoneErrorMessage: '',

            address: this.props.user.Address,
            addressError: false,
            addressErrorMessage: '',

            city: this.props.user.City,
            cityError: false,
            cityErrorMessage: '',

        };
    }

    _logout = () => {

        this.props.logoutUser();
    };


    _validateData = (name,jobs, email, phone, address, city) => {
        let valid = null;

        v = Validate('name',name );


        let v = Validate('email', email);
        this.setState({emailError: v[0], emailErrorMessage: v[1]});

        v = Validate('jobs', jobs);

        // setState is asynchronous and so trying to work with state directly after a setState
        // call won't work as the update won't necessarily have run. Instead you can use the second argument to setState which is a callback
        this.setState({jobsError: v[0], jobsErrorMessage: v[1]}, () => {

            console.log('email error: ' + this.state.emailError + '  job Error: ' + this.state.jobsError);
        });


        v = Validate('city', city);

        // setState is asynchronous and so trying to work with state directly after a setState
        // call won't work as the update won't necessarily have run. Instead you can use the second argument to setState which is a callback
        this.setState({cityError: v[0], cityErrorMessage: v[1]})


        v = Validate('address', address);

        // setState is asynchronous and so trying to work with state directly after a setState
        // call won't work as the update won't necessarily have run. Instead you can use the second argument to setState which is a callback
        this.setState({addressError: v[0], addressErrorMessage: v[1]});


        v = Validate('city', city);

        // setState is asynchronous and so trying to work with state directly after a setState
        // call won't work as the update won't necessarily have run. Instead you can use the second argument to setState which is a callback
        this.setState({cityError: v[0], cityErrorMessage: v[1]}, () => {
            console.log(this.state.cityError + '  Error: ' + this.state.addressError);

            if (this.state.emailError || this.state.jobsError || this.state.phoneError || this.state.addressError || this.state.cityError)
                this.setState({formValid: false});

        });


    };


    saveData() {

        const {name,jobs, email, phone, address, city, formValid} = this.state;

        this._validateData(name,jobs, email, phone, address, city);

        console.log(formValid);

        if (formValid){
            console.log("data valid");

            this.props.updateUser(this.props.userDetails.token,{
  Name: this.state.name,
 // LastName: "Último",
  Company: jobs,
 // Job: jobs,
  Address: address,
  City: city,
 // PostalCode: "3000-010",

  Mobile: phone,
  Avatar: "base64"
} );   this.props.getUserInfo(this.props.userDetails.token);
        }
       


        else
            console.log("data not valid");

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{backgroundColor: '#eee'}}>
                    <View style={styles.container}>
                        <View style={styles.userBioRowHeader}>
                            <View style={styles.userBioRowTitle}>
                                <Text style={{color: '#CC1A17', fontWeight: 'bold', fontSize: 20}}>User Bio</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.saveData()}>
                                    <Icon name="ios-save" size={30}/><Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.userBio}>
                            <View style={styles.userBioRow}>
                                <Icon name="ios-person" style={styles.userBioLogo} size={25}/>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(n) => {
                                               this.setState({name:n })
                                           }}
                                           value={this.state.name}/>
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>
                            <View style={styles.userBioRow}>
                                <Icon name="ios-laptop" style={styles.userBioLogo} size={25}/>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(job) => {
                                               this.setState({jobs: job})
                                           }}
                                           value={this.state.jobs}/>
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>

                            

                            <View style={styles.userBioRow}>
                                <Icon name="ios-phone-portrait" style={styles.userBioLogo} size={25}/>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(phone) => {
                                               this.setState({phone: phone})
                                           }}
                                           value={this.state.phone}/>
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>


                            <View style={styles.userBioRow}>
                                <Icon name="ios-map" style={styles.userBioLogo} size={25}/>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(add) => {
                                               this.setState({address: add})
                                           }}
                                           value={this.state.address}/>
                            </View>

                            <Divider style={{backgroundColor: 'black'}}/>

                            <View style={styles.userBioRow}>
                                <Icon name="ios-map" style={styles.userBioLogo} size={25}/>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(city) => {
                                               this.setState({city: city})
                                           }}
                                           value={this.state.city}/>
                            </View>

                            <Divider style={{backgroundColor: 'black'}}/>
                            <View style={styles.userBioRow}>
                                <Icon name="ios-person" style={styles.userBioLogo} size={25}/>
                                <TouchableOpacity>
                                    <Text style={styles.userCurriculum}>O meu Curriculo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/*PassWord Edit*/}
                    <View style={styles.container}>
                        <View style={styles.userBioRowHeader}>
                            <View style={styles.userBioRowTitle}>
                                <Text style={{color: '#CC1A17', fontWeight: 'bold', fontSize: 20}}>Nova Password:</Text>
                            </View>
                        </View>
                        <View style={styles.userBio}>
                            <View style={styles.userBioRow}>
                                <Text style={styles.userPassText} size={25}>
                                    Old Password:
                                </Text>

                                <TextInput style={styles.userBioText}
                                    placeholder='Antiga Password' secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.userBioRow}>
                                <Text style={styles.userPassText} size={25}>
                                    Nova Password:
                                </Text>

                                <TextInput style={styles.userBioText}
                                           placeholder='Nova Password' secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.userBioRow}>
                                <Text style={styles.userPassText} size={25}>
                                    Repetir Password:
                                </Text>

                                <TextInput style={styles.userBioText}
                                           placeholder='Repetir Password' secureTextEntry={true}
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>


                    <TouchableOpacity onPress={this._logout} style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CC1A17'}}>
                        <Text style={{color:"#fff", fontWeight: 'bold'}}>Logout</Text>
                    </TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },

    userBioRowHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    userBioRowTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },

    userBioRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10

    },
    userBioText: {
        width: SCREEN_WIDTH * 0.50,
    },

    userPassText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    userBioLogo: {
        marginLeft: SCREEN_WIDTH * 0.05,
        width: SCREEN_WIDTH * 0.15,

    },

    bottomLogOut: {
        height: 20,
    },


});

mapStateToProps = (state, props) => {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user,
        userDetails: state.apiReducer.userDetails,
    }
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);