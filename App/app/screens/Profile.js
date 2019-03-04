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

class Profile extends Component {


    constructor(props) {

        super(props);

        this.state = {
            token: false,
            tokenData: '',
            loggedIn: false,
            onHold: true,
            user: {},
            cenas:{Name:'as'},
            text:'',
        };
    }
    _logout = () => {


        //  this.props.navigation.navigate('scan');

        // this.props.logout();
        this.props.logoutUser();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                <View style={styles.userBio}>
                    <View style={styles.userBioRow}>  
                            <Icon name="ios-laptop" style={styles.userBioLogo} size={25}/>
                         
                            <TextInput 
                                  onFocus={this._print} 
                                  maxLength={50} 
                                  blurOnSubmit ={true} 
                                 
                                 
                                  onChangeText={(text) => this.setState({text})}  
                               
                                  value={this.props.user.Job}
                             
                               
                              />
                         
                         
                    </View>

                    <Divider style={{ backgroundColor: 'black' }} />
                    
                    <View style={styles.userBioRow}>  
                        <Icon name="ios-mail" style={styles.userBioLogo} size={25}/>
                        <Text style={styles.userBioText}>{this.props.user.Email}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'black' }} />
                        <View style={styles.userBioRow}>  
                            <Icon name="ios-phone-portrait" style={styles.userBioLogo} size={25}/>
                            <Text style={styles.userBioText}>{this.props.user.Mobile}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black' }} />
                        <View style={styles.userBioRow}>  
                            <Icon name="ios-map" style={styles.userBioLogo} size={25}/>
                            <Text style={styles.userBioText}>{this.props.user.Address}, {this.props.user.City}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black' }} />
                        <View style={styles.userBioRow}>  
                            <Icon name="ios-person" style={styles.userBioLogo} size={25}/>
                            <TouchableOpacity><Text style={styles.userCurriculum}>O meu Curriculo</Text></TouchableOpacity>
                        
                        </View>
                        <Button onPress={this._logout} title="LOGOUT"/>
                       
                    
                    
                    </View>
          
                 </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container:{

    },
    userBioRow:{
        flex:1,
        flexDirection:'row',
        padding:10,
    },
    userBioText:{

    },
    userBioLogo:{
        marginLeft: SCREEN_WIDTH*0.05,
        width: SCREEN_WIDTH*0.15,
    
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