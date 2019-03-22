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
    ActivityIndicator
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
import ImagePicker from 'react-native-image-picker';


var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };


  
class Profile extends Component {


    constructor(props) {

        super(props);

        this.state = {
            name: this.props.user.Name,
            userDetails: {},
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

            oldPass:'',
            new1:'',
            new2:'',

            url:this.props.user.Url,
            curso:this.props.user.LastName,
            

        };
    }

    _press=()=>{
        this.props.changePassword(
            this.props.token, 
            this.state.oldPass,
            this.state.new1,
            this.state.new2
            )
    }
    _logout = () => {

        this.props.logoutUser();
    };


    _validateData = (name, jobs, email, phone, address, city) => {
        let valid = null;

        v = Validate('name', name);


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

        const {name, jobs, email, phone, address, city, formValid, url,curso} = this.state;

       // this._validateData(name, jobs, email, phone, address, city,curso);

        console.log(formValid);

        this.props.hold();
        if (formValid) {
            console.log("data valid");

            this.props.updateUser(this.props.token, {
                Name: this.state.name,
                Company: jobs,
                LastName: curso,
                Address: address,
                City: city,
                Mobile: phone,
                Avatar: "base64",
                Url:url,

            });
            
        }


        else
            console.log("data not valid");

    }
    _open=()=>{
        ImagePicker.launchCamera(options, (response) => {
            // Same code as in above section!
          });
       
    }

    render() {
        if (this.props.onHold) {
            return (
              <View style={{marginTop:SCREEN_HEIGHT*0.40}}>
                
                <ActivityIndicator size="large" color="#CC1A17" />
              </View>
            );
          }
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{backgroundColor: '#eee'}}>
                    <View style={styles.container}>
                        <View style={styles.userBioRowHeader}>
                            <View style={styles.userBioRowTitle}>
                                <Text style={{color: '#CC1A17', fontWeight: 'bold', fontSize: 20}}>Informações Pessoais</Text>
                            </View>
                           
                        </View>
                        <Button  onPress={ this._open} title="Editar foto de perfil" color="#CC1A17"
                                      />
                        <View style={styles.userBio}>
                            <View style={styles.userBioRow}>
                                <Text style={styles.userBioLogo} >Nome</Text>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(n) => {
                                               this.setState({name: n})
                                           }}
                                           value={this.state.name}/>
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>
                            <View style={styles.userBioRow}>
                                <Text style={styles.userBioLogo} >Curso</Text>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(cu) => {
                                               this.setState({curso: cu})
                                           }}
                                           value={this.state.curso}/>
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>

                            <View style={styles.userBioRow}>
                                <Text style={styles.userBioLogo} >Faculdade</Text>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(job) => {
                                               this.setState({jobs: job})
                                           }}
                                           value={this.state.jobs}/>
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>


                            <View style={styles.userBioRow}>
                                <Text style={styles.userBioLogo} >Telemóvel</Text>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(phone) => {
                                               this.setState({phone: phone})
                                           }}
                                           value={this.state.phone}/>
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>


                            <View style={styles.userBioRow}>
                                <Text style={styles.userBioLogo} >Morada</Text>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(add) => {
                                               this.setState({address: add})
                                           }}
                                           value={this.state.address}/>
                            </View>

                            <Divider style={{backgroundColor: 'black'}}/>

                            <View style={styles.userBioRow}>
                            <Text style={styles.userBioLogo} >LinkedIn</Text>

                                <TextInput style={styles.userBioText}
                                           onChangeText={(u) => {
                                               this.setState({url: u})
                                           }}
                                           value={this.state.url}/>
                            </View>

                          
                            <Button  onPress={() => this.saveData() } title="Guardar Alterações" color="#CC1A17"
                                      />
                          
                        </View>
                    </View>

                    {/*PassWord Edit*/}
                    <View style={styles.container}>
                        <View style={styles.userBioRowHeader}>
                            <View style={styles.userBioRowTitle}>
                                <Text style={{color: '#CC1A17', fontWeight: 'bold', fontSize: 20}}>Alterar Password</Text>
                            </View>
                        </View>
                        <View style={styles.userBio}>
                      

                            <View style={styles.userBioRow}>
  
                                <TextInput style={styles.userBioText}
                                           placeholder='Antiga Password' 
                                           onChangeText={(old => {
                                            this.setState({oldPass: old})
                                           })}
                                        value={this.state.oldPass}
                                        maxLength = {20}
                                        
                                           secureTextEntry={true}
                                />
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>

                            <View style={styles.userBioRow}>
                               

                                <TextInput style={styles.userBioText}
                                           placeholder='Nova Password'
                                            secureTextEntry={true}
                                            onChangeText={(newz => {
                                                this.setState({new1: newz})
                                               })}
                                            value={this.state.new1}
                                            maxLength = {20}
                                />
                            </View>
                            <Divider style={{backgroundColor: 'black'}}/>

                            <View style={styles.userBioRow}>
                                

                                <TextInput style={styles.userBioText}
                                           placeholder='Repetir Password' 
                                           secureTextEntry={true}
                                           onChangeText={(newzz => {
                                            this.setState({new2: newzz})
                                           })}
                                        value={this.state.new2}
                                        maxLength = {20}
                                />
                            </View>
                           
                            <Button onPress={this._press} title="Alterar Password" color="#CC1A17"
                                      />
                           
                        </View>
                    </View>

                    <TouchableOpacity onPress={this._logout} style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    marginTop:30
                }}>
                    <Text style={{color: "#fff", fontWeight: 'bold'}}>Logout</Text>

                </TouchableOpacity>

                </ScrollView>


              

            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        margin: 10,
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
        padding: 10,
       // borderWidth: 2,
        alignItems: 'center',

    },
    userBioText: {
        width: SCREEN_WIDTH * 0.40,
        flex: 2,
     //   borderWidth: 2,
    },

    userPassText: {
        flex: 1,
        //alignSelf: 'flex-start',
        justifyContent: 'flex-end',
        borderWidth: 2,
    },

    userBioLogo: {
        marginLeft: 10,
        width:80,
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
        onHold:state.apiReducer.onHold
    }
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);