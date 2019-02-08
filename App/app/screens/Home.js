import React, {Component} from 'react';
<<<<<<< HEAD
import {Button, View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
=======

import { Button, View, Text , TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';

>>>>>>> Enei/master
import {
    RkButton,
    RkTheme
} from 'react-native-ui-kitten';
<<<<<<< HEAD
import {connect} from 'react-redux';
=======

import { connect } from 'react-redux';

>>>>>>> Enei/master
import {bindActionCreators} from 'redux';

import * as Actions from '../actions'; //Import your actionss

import Counter from './Counter'

import {createStore} from 'redux';

import {Provider} from 'react-redux'


class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
<<<<<<< HEAD
            token: false,
            tokenData: '',
            loggedIn: false,
            onHold: true,
            user: {}
=======
            token:{valid:false},
            logged:true,
            onHold:true,
            user:{Name:''}
>>>>>>> Enei/master
        };


    }

    componentDidMount() {


        this.props.hold();
        //this.props.logoutUser();
<<<<<<< HEAD

        this.props.getUserInfo();

        console.log('logged:' + this.props.loggedIn);
=======
        //console.log(this.props.token);
    
        this.props.getUserInfo(this.props.token);

   
        //console.log('logged:'+this.props.logged);
>>>>>>> Enei/master

        //console.log(th2is.props)

        console.log(this.props.user)
        
    }

    bClick() {

        //this.props.logoutUser();

<<<<<<< HEAD
=======
        let a={};
       // this.setState({ user: this.props.user });
       // console.log(this.props.user)
      //
        


>>>>>>> Enei/master
        //var navigate  = this.props.navigation.navigate
    }

    _logout = () => {
<<<<<<< HEAD
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
=======
       
      //  this.props.navigation.navigate('scan');
      
       // this.props.logout();
        this.props.logoutUser();
      }
    update=()=>{


        this.setState({ user: this.props.user });
        var o=[];

        for(var key in this.props.user.Sessions){
          
          
            o.push({
                time:this.props.user.Sessions[key].SessionStart.substr(11, 16),
                timeEnd: this.props.user.Sessions[key].SessionEnd.substr(11, 16),
                lineColor:'#009688',
                imageUrl: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Vjkyj2hBg/welcome-white-sign-with-falling-colorful-confetti-animation-on-white-background_sglmmh3qm__F0013.png',
                description:this.props.user.Sessions[key].Description,
                name:this.props.user.Sessions[key].Name,
  

            })
            
        }
        console.log(this.props.user.Sessions);
      }
    render() {
        
       

        const { navigate } = this.props.navigation;
>>>>>>> Enei/master

        if(this.props.onHold){
         
            return (
<<<<<<< HEAD
                <View>
                    <Button onPress={this._logout} title="LOGOUT"/>
                    <Text></Text>
                    <Text>Nome: {this.props.user.Email}</Text>
                    <Text>city: {this.props.user.City}</Text>
                    <Text>phone: {this.props.user.Mobile}</Text>
=======
             
                <View>
                    <Text>lollsss {this.props.onHold}</Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                ) 
        }
>>>>>>> Enei/master

        if(this.props.logged){

<<<<<<< HEAD
=======
        
            return (
                <View >
                  
                    <Button  onPress={this._logout} title="LOGOUT"/>
                    <Button  onPress={this.update} title="update"/>
                    <Button  onPress={this.bClick} title="Parse"/>
                    <Text>  Nomess: {this.props.user.Name}</Text>
                       
                    <Text> city: {this.props.user.City}</Text>
                    <Text> phone: {this.props.user.Mobile}</Text>
                   
                
 
>>>>>>> Enei/master
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

<<<<<<< HEAD

        token: state.apiReducer.token,
        user: state.apiReducer.user


=======
        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged    
    
>>>>>>> Enei/master
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);