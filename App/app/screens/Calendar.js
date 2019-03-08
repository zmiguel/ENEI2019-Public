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


const formatObj = (obj) => {

    let a = {};

    a.push({})

    return a

};


const ThirdRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#efc44a'}]}/>
);


const FourthRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#49ef97'}]}/>
);


class Calendar extends React.Component {
    
    state = {
        index: 0,
        routes: [
            {key: 'first', weekDay: 'sex', day:12},
            {key: 'second', weekDay: 'sab',day:13},
            {key: 'third', weekDay: 'dom', day:14},
            {key: 'fourth', weekDay: 'seg', day:15},

        ],
        CP:'SEM'
    };

    componentDidMount() {

        this.props.getEvents(this.props.user);

        this.props.getSessions(this.props.userDetails.token)

     
    }

    _openDetails=()=>{

        console.log("los");
    }

    renderDetail = ({item, index}) => {
        const {navigate} = this.props.navigation;
        //  <Image source={{ uri:item.imageUrl, width:'100%' , height:100 }} style={{borderRadius:0}}/>
        return (
            <TouchableOpacity  onPress={() => navigate('calendarDetail', { info: item })} >

            <View style={styles.event}>
                <View style={styles.titleContainer}>
                <Text style={[styles.title]}>{item.name}</Text>
                <Text style={{color:'black'}}>Local: 1</Text>
                </View>
             
                <View>


                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.details}>
                        <Progress.Bar color={'#000000'} progress={item.Enrolled/item.MaxAttendees} unfilledColor={'white'} width={210}/>
                        <Text>{item.Enrolled} / {item.MaxAttendees}</Text>
                    </View>

                </View>
                
            </View>
            </TouchableOpacity>
        );
    }



    _update = () => {
        this.setState({user: this.props.user});
        console.log(this.props.events);
    }


    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
    
        return (
          <View style={styles.tabBar}>
            {props.navigationState.routes.map((route, i) => {
              const bgcolor = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map(
                  inputIndex => (inputIndex === i ? '#CC1A17' : 'rgba(0,0,0,0)')
                ),
              });
              const color = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map(
                  inputIndex => (inputIndex === i ? 'white' : 'black')
                ),
              });


              return (
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => this.setState({ index: i })}>
                    
                    <Animated.Text style={{ color :'#7A7B7B' }}>{route.weekDay}</Animated.Text>
                     <Animated.Text style={{ backgroundColor: bgcolor, borderRadius:90 , padding:10, marginTop:5, color:color, fontSize:15}}>{route.day}</Animated.Text>

                </TouchableOpacity>
              );
            })}
          </View>
        );
      };



    constructor() {

        super()

        const archeryImgSource = require('../assets/img/archery.png');
        const badmintonImgSource = require('../assets/img/badminton.png');
        const lunchImgSource = require('../assets/img/lunch.png');
        const soccerImgSource = require('../assets/img/soccer.png');
        const dumbbellImgSource = require('../assets/img/dumbbell.png');

        const ArcheryImage = (props) => <Image source={archeryImgSource} {...props} />;
        const BadmintonImage = (props) => <Image source={badmintonImgSource} {...props} />;
        const LunchImage = (props) => <Image source={lunchImgSource} {...props} />;
        const SoccerImage = (props) => <Image source={soccerImgSource} {...props} />;
        const DumbbellImage = (props) => <Image source={dumbbellImgSource} {...props} />;
        const VectorIconImage = (props) => <Image source={vectorIconImgSource} {...props} />;

        this.data = [



        ]
    }

    render() {

        const FirstRoute = () => (

            <ScrollView contentContainerStyle={styles.contentContainer}>

                <Timeline

                    data={this.props.events}

                    timeContainerStyle={{ marginTop: 0}}

                    timeStyle={{

                        textAlign: 'center',
                       // backgroundColor: 'red',
                       
                        height:100,
                        color:"#CC1A17",
                        padding: 5,
                        //marginTop:10,
                      //  fontWeight:'bold',
                        fontSize:23,
                        
                        //borderRadius: 13
                    }}
                    
                    descriptionStyle={{color: 'red'}}

                    renderDetail={this.renderDetail}

                    lineColor='rgba(0,0,0,0)'
                    lineWidth={1}
                    separator={false}
                    flatListProps={{
                        style: {

                            margin: 15
                        }


                    }}
                    keyExtractor={(item, index) => index.toString()}


                />


            </ScrollView>

        )
        const SecondRoute = () => (

            <ScrollView contentContainerStyle={styles.contentContainer}>

                <Timeline

                    data={this.props.events}

                    timeContainerStyle={{ marginTop: 0}}

                    timeStyle={{

                        textAlign: 'center',
                       // backgroundColor: 'red',
                       
                        height:100,
                        color:"#CC1A17",
                        padding: 5,
                        //marginTop:10,
                      //  fontWeight:'bold',
                        fontSize:23,
                        
                        //borderRadius: 13
                    }}
                    
                    descriptionStyle={{color: 'red'}}

                    renderDetail={this.renderDetail}

                    lineColor='rgba(0,0,0,0)'
                    lineWidth={1}
                    separator={false}
                    flatListProps={{
                        style: {

                            margin: 15
                        }


                    }}
                    keyExtractor={(item, index) => index.toString()}


                />


            </ScrollView>

        )

      
        return (
           <View style={{flex:1}}>
           <View>
               <Text style={{
                   backgroundColor:"#CC1A17",
                   color:'white',
                   fontWeight:'bold',
                   fontSize:15,
                   textAlign:'center',

                   }}>
             {this.props.careerPath}
               </Text>
           </View>
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute,
                    fourth: FourthRoute
                })}
                renderTabBar={this._renderTabBar}
                useNativeDriver={true}
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
                style={{backgroundColor:"#F2F2F2"}}
                indicatorStyle={{ backgroundColor: 'pink' }}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        paddingTop:0,
        marginTop:0,
        backgroundColor:'white',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    
       
      },
      tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
      },
    details: {
        backgroundColor: "#FFFFFF",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10,
        paddingTop:0
       
    },
    description: {
        padding: 10,
        paddingLeft:0,
        paddingTop:0
     
    },
    title: {
        color: '#212121',
        fontWeight: 'bold',
        fontSize: 15,
        
    },
    titleContainer:{
        padding: 10
    },
    event: {
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        marginLeft:-25,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
        marginRight:2


    },
    scene: {
        flex: 1,
    },
    contentContainer: {
        //paddingVertical: 20,
        backgroundColor:'#F2F2F2'
    }
});
RkTheme.setType('RkCard', 'story', {
    img: {
        height: 100,
        opacity: 0.7
    },
    header: {
        alignSelf: 'center'
    },
    content: {
        alignSelf: 'center'
    }
});


function mapStateToProps(state, props) {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        events: state.apiReducer.events,
        userDetails: state.apiReducer.userDetails,
        sessions: state.apiReducer.sessions,
        careerPath: state.apiReducer.careerPath

    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);