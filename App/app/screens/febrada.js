import * as React from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView, Text, Button, TouchableOpacity, Animated} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {
    RkButton, RkCard, RkText,
    RkTheme
} from 'react-native-ui-kitten';
import Timeline from 'react-native-timeline-feed'

import * as Progress from 'react-native-progress';


import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import * as Actions from '../store/actions'; //Import your actionss


import { Slider } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
class febrada extends React.Component {
    
    state = {
        index: 0,
       
    };

    componentDidMount() {

        this.props.getEvents(this.props.user);
        console.log('didMount');
        console.log(this.props.events);
    }

  


 

    constructor() {

        super()

       
    }

    render() {

     
        return (
           <View style={{flex:1}}>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' ,width:SCREEN_WIDTH*0.7}}>
  <Slider
  maximumValue={50}
  minimumValue={2}
    value={this.state.value}
    onValueChange={value => this.setState({ value })}
  />
  <Text>Value: {Math.round(this.state.value)}</Text>
</View></View>
        );
    }
}

const styles = StyleSheet.create({
   
});



function mapStateToProps(state, props) {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        events: state.apiReducer.events,
        userDetails: state.apiReducer.userDetails,

    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(febrada);