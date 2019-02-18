import React, {Component} from 'react';

import {
    Button,
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native';

import {Shadow} from 'react-native-shadow'
import Icon from "react-native-vector-icons/Ionicons"
import {
    RkButton,
    RkTheme
} from 'react-native-ui-kitten';


import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import * as Actions from '../store/actions'; //Import your actionss
import ImageOverlay from "react-native-image-overlay";

import {createStore} from 'redux';
import PTRView from 'react-native-pull-to-refresh';
import {Provider} from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import {Card, Divider} from 'react-native-elements'

import RNMaterialShadows from 'react-native-material-shadows';
 
const shadowOpt = {
    width:100,
    height:100,
    color:"#000",
    border:2,
    radius:3,
    opacity:0.2,
    x:0,
    y:3,
    style:{marginVertical:5}
}

class Home extends Component {
    
    _refresh() {
        return new Promise((resolve) => {
          setTimeout(()=>{resolve()}, 2000)
        });
      }
      _callApi(){
         
        this.props.getUserInfo(this.props.token);
      }
    constructor(props) {

        super(props);

        this.state = {

            token: {valid: false},
            logged: true,
            onHold: true,
            user: {Name: ''}
        };
    }

    componentDidMount() {


        this.props.hold();
        //this.props.logoutUser();

        //console.log(this.props.token);

        this.props.getUserInfo(this.props.token);


        //console.log('logged:'+this.props.logged);

        //console.log(th2is.props)

     

    }

    bClick() {

        //this.props.logoutUser();

        let a = {};
        // this.setState({ user: this.props.user });
        // console.log(this.props.user)
        //


        //var navigate  = this.props.navigation.navigate
    }
_update=()=>{
    if(this.props.token!= undefined)
    this.props.getUserInfo(this.props.token);
    
}
    
    
    render() {


        const {navigate} = this.props.navigation;

        if (this.props.onHold) {

            return (
                <View>
                    <Text>lollsss {this.props.onHold}</Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }
        if (this.props.logged) {

            return (
                <PTRView onRefresh={this._update} >
                <ScrollView style={{backgroundColor:'#eeeeee'}}>
                <View>
               
                <ImageBackground 
                    opacity={0.9}
                    source={require('../assets/img/bg_3.jpg')} 
                    style={{
                        width: '100%', 
                    
                        
                      //  marginTop:150,
                        backgroundColor: 'rgba(255,255,255,1)' , 
                 shadowOffset:{ width: 10, height: 10, },
shadowColor: 'black',
shadowOpacity: 1.0
                    }
                }>
                
                    <View style={styles.homeHeader}>
                    <View style={styles.userImageContainer}>    
                        <Image style={styles.userImage} source={{uri: 'https://i.imgur.com/XXJ7LxV.jpg'}}/>
                    </View>
                    <Text style={styles.userText}>{this.props.user.Name}</Text>
                   
                    <Text style={styles.userTextSub}>{this.props.user.Company}</Text>
           
                    </View>
                
                    </ImageBackground>
                 
                    <View style={styles.userStats}> 
                       
                       <Text style={styles.userStatsTitle}>O meu saldo:</Text>
                       <View style={styles.userStatsBox}>
                           <View style={styles.userBox}>
                               <Icon name="ios-beer" style={styles.userStatsBoxIcon} size={50}/>
                               <Text style={styles.userBoxText}>0 Fino(s)</Text>
                           </View>
                           <View style={styles.userBox}>
                               <Icon name="ios-beer" style={styles.userStatsBoxIcon} size={50}/>
                               <Text style={styles.userBoxText}>0 Fino(s)</Text>
                           </View>
                           <View style={styles.userBox}>
                               <Icon name="ios-beer" style={styles.userStatsBoxIcon} size={50}/>
                               <Text style={styles.userBoxText}>0 Fino(s)</Text>
                           </View>
                       </View>
                   </View>

                  

                    <View style={styles.userBio}>
                    <View style={styles.userBioRow}>  
                            <Icon name="ios-laptop" style={styles.userBioLogo} size={25}/>
                            <Text style={styles.userBioText}>{this.props.user.Job}</Text>
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
                       
                    
                    
                    </View>
              
             
                    
                  

                </View>
                </ScrollView>
                </PTRView>
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

}

const styles = StyleSheet.create({
    userBoxText:{
        color:'white',
        fontWeight:'bold'
    },
    userStatsBoxIcon:{
color:'white'
    },
  userStatsBox:{
    flex:1,
    flexDirection:'row'
  },
userBox:{
    alignItems:'center',
    justifyContent:'center',
    width:'33%',
  

},
    userCurriculum:{
        paddingTop:5,
        color:'red',
        fontWeight:'bold',
        fontSize:15
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

   
    userTextSub:{
        backgroundColor: 'rgba(0,0,0,0.7)' ,  
        color:'white',
    },
    userText:{
        backgroundColor: 'rgba(0,0,0,0.7)' , 
        color:'white',
        fontWeight:'bold',
        fontSize:20,
    },
    homeHeader:{
        flex:1,
       
        height: SCREEN_HEIGHT*0.3,
        justifyContent: 'center',
        alignItems:'center' ,
   
    },
    userImage:{
       
      width:110,
      height:110,
      borderWidth: 1,
     borderRadius: 5,
      borderWidth:2,
      borderColor: 'white',
     
      
    },
    userBio:{
        flex:1,
        padding:10,
        margin:9,
        backgroundColor:'white',
       // height: SCREEN_HEIGHT*0.20,
        color:'black',
        borderRadius:5,
    },
    userStats:{
        backgroundColor:'#CC1A17',
        height: SCREEN_HEIGHT*0.2,
        padding:10,
        margin:10,
        borderRadius:5,
        marginTop:10,
       marginBottom:0

       
    },
    userStatsTitle:{
        color:'white',
        fontSize:17,
        fontWeight:'bold',
        padding:1
    },
    userImageContainer:{
        alignSelf: 'center',
       
       
      
      
        
       // transform: [{ rotate: '-15deg'}],
     
    }



});
function mapStateToProps(state, props) {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged

    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);