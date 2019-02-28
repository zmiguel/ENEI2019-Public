import * as React from 'react';
import {
        View, 
        StyleSheet, 
        Dimensions, 
        Image, 
        ScrollView, 
        Text, 
        Button, 
        TouchableOpacity
    } from 'react-native';

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
import Swiper from 'react-native-swiper';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import FitImage from 'react-native-fit-image';

import { Dropdown } from 'react-native-material-dropdown';


const formatObj = (obj) => {

    let a = {};

    a.push({})

    return a

};



class choosePath extends React.Component {

    state = {
     
    };

    componentDidMount() {

        this.props.getEvents(this.props.user);
        console.log('didMount');
        console.log(this.props.events);
    }



    _update = () => {
        this.setState({user: this.props.user});
        console.log(this.props.events);
    }


    constructor() {

        super()



        this.data = [



        ]
    }
    getCareerPaths=()=>{
        this.props.getAvailableGuestlists(this.props.userDetails.token)
    }
    render() {
        let data = [{
          value: 'Desenvolvimento Web',
        }, {
          value: 'Inteligencia artificial',
        }, {
          value: 'Redes e segurança',
        }];
     
        return (
            <View style={{flex:1,width:SCREEN_WIDTH*0.7, alignContent:'center'}}>
              
                 <Dropdown
            label='Career Path'
            data={data}
    
          />

                <Button onPress={this.getCareerPaths} title="teste"/>
            </View>
         
        );
      }
 
}

const styles = StyleSheet.create({
    
    carreerPathContainer:{
        backgroundColor:'#CC1A17',
        height:50,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:15,
    },
    carreerPathText:{
        
        height:50,
        color:'white',
        fontWeight:'bold',
        fontSize:20,

    },
    companyHeader:{
        backgroundColor:'#dddddd',
       // height:150,
        borderRadius:5,
        margin:10,
        padding:10
        
      
    },
    companyTitle:{
        paddingBottom:5,
        fontWeight:'bold',
        color:'#777777',
        fontSize:17,
        
       // padding:20
    },
    companyLogo: {

        borderRadius: 20,
        
    },
      
    wrapper: {
       
    },
    company:{
        flex:1,
        flexDirection:'row',
       // backgroundColor:'red',
        color:'black'
    },

    companyLogoContainer:{
        flex:1,
        justifyContent: 'center',
        width:'60%',
       // backgroundColor:'white',
        margin:20,


    },
    aboutCompany:{
        width:SCREEN_WIDTH,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }

   
});



function mapStateToProps(state, props) {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        events: state.apiReducer.events,
        userDetails: state.apiReducer.userDetails


    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(choosePath);