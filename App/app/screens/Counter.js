import React, { Component } from 'react';
import { Button, View, Text , TouchableOpacity} from 'react-native';
import {RkButton,
    RkTheme } from 'react-native-ui-kitten';

import deviceStorage from '../services/deviceStorage';
import AuthLoadingScreen from './AuthLoading';
import api from '../services/api';


import {connect} from 'react-redux'

 class Counter extends Component {

    static navigationOptions = {
        title: 'Home'
    };

  
    render() {

        
        return (
             
            <View style={{flex:1, alignItems: 'center', alignContent: 'center'}}>
           
                 <View style={{flexDirection:'row', margin:50}}> 
                    <TouchableOpacity onPress={()=>this.props.increaseCounter()}>
                        <Text style={{fontSize:30}}>Increase</Text>
                    </TouchableOpacity>
                    <Text>{this.props.counter}</Text>
                    <TouchableOpacity onPress={()=>this.props.decreaseCounter()}>
                        <Text style={{fontSize:30}}> Decrease</Text>
                    </TouchableOpacity>


            </View>
             
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        counter:state.counter
    }
}

function mapDispatchToProps(dispatch){
    return {
        increaseCounter:()=> dispatch({type:'INCREASE_COUNTER' }),
        decreaseCounter:()=> dispatch({type:'DECREASE_COUNTER' }),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)