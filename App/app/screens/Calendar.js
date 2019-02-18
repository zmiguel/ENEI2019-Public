import * as React from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView, Text, Button} from 'react-native';
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
            {key: 'first', title: 'Sex 12'},
            {key: 'second', title: 'Sab 13'},
            {key: 'third', title: 'Dom 14'},
            {key: 'fourth', title: 'Seg 15'},

        ],
    };

    componentDidMount() {

        this.props.getEvents(this.props.user);
        console.log('didMount');
        console.log(this.props.events);
    }


    renderDetail = ({item, index}) => {
        //  <Image source={{ uri:item.imageUrl, width:'100%' , height:100 }} style={{borderRadius:0}}/>
        return (


            <View style={styles.event}>
                <Text style={[styles.title]}>{item.name}</Text>
                <View>


                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.details}>
                        <Progress.Bar color={'#42a5f5'} progress={0.3} unfilledColor={'white'} width={210}/>
                        <Text>{item.Enrolled} / {item.MaxAttendees}</Text>
                    </View>

                </View>
                
            </View>
        );
    }


    renderEvents = ({item, index}) => {

        return (
            <View style={styles.event}>
                <Text style={[styles.title]}>{item.title}</Text>
                <View>

                    <Image source={{uri: item.imageUrl, width: '100%', height: 100}} style={{borderRadius: 0}}/>


                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.details}>
                        <Progress.Bar color={'#42a5f5'} progress={0.3} unfilledColor={'white'} width={210}/>
                        <Text>1/50</Text>
                    </View>

                </View>
            </View>
        );
    }

    _update = () => {
        this.setState({user: this.props.user});
        console.log(this.props.events);
    }


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

                    timeContainerStyle={{minWidth: 52, marginTop: 5}}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: '#ff9797',
                        color: 'white',
                        padding: 5,
                        borderRadius: 13
                    }}
                    descriptionStyle={{color: 'gray'}}

                    renderDetail={this.renderDetail}


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

                    timeContainerStyle={{minWidth: 52, marginTop: 5}}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: '#ff9797',
                        color: 'white',
                        padding: 5,
                        borderRadius: 13
                    }}
                    descriptionStyle={{color: 'gray'}}

                    renderDetail={this.renderDetail}


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

            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute,
                    fourth: FourthRoute
                })}
                useNativeDriver
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
            />
        );
    }
}

const styles = StyleSheet.create({
    details: {
        backgroundColor: "#e0e0e0",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10
    },
    description: {
        padding: 10
    },
    title: {
        color: '#212121',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10
    },
    event: {
        borderRadius: 10,
        backgroundColor: '#eeeeee',

    },
    scene: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 20
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
        events: state.apiReducer.events

    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);