import React, { Component } from 'react';
import { Button, View, Text , TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions'; //Import your actionss


class logout extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            token:false,
            tokenData:'',
            loggedIn:false,
            onHold:true
        };

     
    }

    componentDidMount() {

        console.log('logout')
        this.props.logoutUser();
       
        //this.props.navigation.navigate('Home');
    }

   


    render() {
        
        const { navigate } = this.props.navigation;
            return (
                <View >
                
                    <Text>LOGGED OUT</Text>

                </View>
            );
      
     
        
    }


}


function mapStateToProps(state, props) {
    
    return {

    
        token: state.apiReducer.token,
      

    
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(logout);