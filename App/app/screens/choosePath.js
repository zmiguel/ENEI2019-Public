import * as React from 'react';
import {
        View, 
        StyleSheet, 
        Dimensions, 
        Image, 
        ScrollView, 
        Text, 
        Button, 
        TouchableOpacity,
        Picker,
        CheckBox,
        ActivityIndicator,
        SectionList
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
import {Card, Divider} from 'react-native-elements'
import IconF from "react-native-vector-icons/Foundation"
const formatObj = (obj) => {

    let a = {};

    a.push({})

    return a

};



class choosePath extends React.Component {

    static navigationOptions = ({ navigation }) => ({
     
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'rgba(0,0,0,0)',
                shadowRadius:0,
                elevation:0
            },
        });

    state = {
     calendar:{}
    };

    componentDidMount() {

       // this.props.getEvents(this.props.user);
       this.props.getAvailableGuestlists(this.props.userDetails.token)
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
        console.log(this.props.calendar)
    }




    render() {
      

        return (
            <ScrollView style={styles.page}>

                <View style={styles.companyContainer}>
            
                 </View>
         
                <View style={{flex:1,width:SCREEN_WIDTH*0.7, alignContent:'center'}}>
              

                <View style={styles.pickerCareer}>
                    <Picker
                    selectedValue={this.state.guest}
                   style={{width:'100%'}}
                    onValueChange={(itemValue, itemIndex) =>{
                        this.setState({guest: itemValue})
                        this.props.waitChangeGuest();
                        this.props.changeGuestList(this.props.userDetails.token,itemValue)
                        this.props.waitChangeGuest();
                        this.props.getAvailableSessions(this.props.userDetails.token);
                        
                        
                    }
                    
                    }>
                    <Picker.Item label="Inteligência Artificial" value="9" />
                    <Picker.Item label="Redes e Segurança" value="10" />
                    <Picker.Item label="Data Science" value="15" />
                    <Picker.Item label="Desenvolvimento Web" value="14" />
                    <Picker.Item label="Internet das Coisas" value="12" />
                    <Picker.Item label="Desenvolvimento Mobile" value="11" />   

                    </Picker>
                </View>
              

                <SectionList
  renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
  renderSectionHeader={({section: {title}}) => (
    <Text style={{fontWeight: 'bold'}}>{title}</Text>
  )}
  sections={[
    {title: 'Title1', data: ['item1', 'item2']},
    {title: 'Title2', data: ['item3', 'item4']},
    {title: 'Title3', data: ['item5', 'item6']},
  ]}
  keyExtractor={(item, index) => item + index}
/>
               </View >
               {  !this.props.changingGuest &&
                 
                    <View style={styles.block}>
                    
                        <View style={styles.time}>
                            <Text style={
                                {
                                    margin:10,
                                    fontSize:25,
                                    color:'#CC1A17',
                                    marginBottom:0
                                }
                                }>
                            9:00</Text>
                            <Text style={{marginLeft:20}}>até</Text>
                            <Text style={
                                {
                                    margin:10,
                                    fontSize:25,
                                    color:'#CC1A17',
                                    marginTop:5
                                }
                                }>
                            9:30</Text>
                           
                        </View>
                        
                        <View style={styles.sessions}>

                            <View style={styles.session}>

                                <CheckBox
                                style={{margin:10}}
                                value={this.state.checkbox1}
                                onChange={() => this.setState({ checkbox1: !this.state.checkbox1 })}
                                />
                                <TouchableOpacity><View style={styles.sessionInfo}>
                                    <Text style={styles.sessionTitle}>Nome da palestra</Text>
                                    <Text style={{marginTop:10, marginBottom:5}}>12 Lugares disponíveis</Text>
                                    <Progress.Bar color={'#000000'} progress={0.3} unfilledColor={'white'} width={150}/>
                                </View></TouchableOpacity>
                                
                              
                               
                            </View>

                            <Divider style={{ backgroundColor: '#eeeeee' }} />

                            <View style={styles.session}>

<CheckBox
style={{margin:10}}
value={this.state.checkbox1}
onChange={() => this.setState({ checkbox1: !this.state.checkbox1 })}
/>
<TouchableOpacity><View style={styles.sessionInfo}>
    <Text style={styles.sessionTitle}>Nome da palestra</Text>
    <Text style={{marginTop:10, marginBottom:5}}>12 Lugares disponíveis</Text>
    <Progress.Bar color={'#000000'} progress={0.3} unfilledColor={'white'} width={150}/>
</View></TouchableOpacity>



</View>

<Divider style={{ backgroundColor: '#eeeeee' }} />

<View style={styles.session}>

<CheckBox
style={{margin:10}}
value={this.state.checkbox1}
onChange={() => this.setState({ checkbox1: !this.state.checkbox1 })}
/>
<TouchableOpacity><View style={styles.sessionInfo}>
    <Text style={styles.sessionTitle}>Nome da palestra</Text>
    <Text style={{marginTop:10, marginBottom:5}}>12 Lugares disponíveis</Text>
    <Progress.Bar color={'#000000'} progress={0.3} unfilledColor={'white'} width={150}/>
</View></TouchableOpacity>



</View>

<Divider style={{ backgroundColor: '#eeeeee' }} />


                          
                        </View>
                    </View>
               }
               {this.props.changingGuest &&

<ActivityIndicator size="large" color="red"/>
                }

       
    
            </ScrollView>
        );
      }
 
}

const styles = StyleSheet.create({
    sessionInfo:{
        margin:5
    },
    sessionTitle:{
        fontSize:15,
       fontWeight:'bold'
    },  
    day:{
        margin:10
    },
    dayText:{
        fontSize:20,
        color: '#CC1A17',
        textAlign: 'center', 
       
    },
    time:{
        alignContent:'center',
        width:SCREEN_WIDTH*0.20,
        backgroundColor:'white'
    },

    block:{

        flex:1,
        flexDirection:'row',
        backgroundColor:'red',
        margin:10,
        borderRadius:5

    },

  companyContainer:{
      flex:1,
      backgroundColor:'blue',
      height:SCREEN_HEIGHT*0.25,

  },

 
  sessions:{
    flex:1,
    flexDirection:'column',
   
    backgroundColor:'white',
   
  },

  page:{
      backgroundColor:'#eeeeee',
    
  },
  pickerCareer:{

   paddingLeft:30,
   paddingRight:30,
      backgroundColor:'white',
      width:SCREEN_WIDTH,

  },
  session:{
    margin:10,
    flex:1,
    flexDirection:'row',
 
  }
   
});



function mapStateToProps(state, props) {

    return {

       // token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        events: state.apiReducer.events,
        userDetails: state.apiReducer.userDetails,
        calendar : state.apiReducer.calendar,
        changingGuest : state.apiReducer.changingGuest,
        sessions:state.apiReducer.sessions,


    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(choosePath);