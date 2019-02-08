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

import * as Actions from '../actions'; //Import your actionss


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


            {
                time: '09:30',
                title: 'Sessão de Check-In',
                description: 'Os participantes devem fazer o check-in e recolher o kit fornecido pela organização',
                lineColor: '#009688',
                icon: ArcheryImage,
                imageUrl: 'https://blogsimages.adobe.com/conversations/files/2014/03/Check_In-1.jpg'
            },
            {
                time: '17:45',
                title: 'Sessão de Abertura',
                lineColor: '#009688',
                description: 'Bem vindo a Coimbra, a cidade dos estudantes! Obrigado por participares na 13ª edição do ENEI.',
                icon: BadmintonImage,
                imageUrl: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Vjkyj2hBg/welcome-white-sign-with-falling-colorful-confetti-animation-on-white-background_sglmmh3qm__F0013.png'
            },
            {
                time: '19:30',
                title: 'Jantar',
                lineColor: '#009688',
                description: 'Time to eat',
                icon: BadmintonImage,
                imageUrl: 'https://www.retailmenot.com/blog/wp-content/uploads/2016/08/kids-eat-free-hero1-1471459190.jpg'
            },

            {
                time: '23:30',
                title: 'Festarola',
                lineColor: '#009688',
                description: 'Sabes beber? Se não sabes, aprende com os da casa!',
                icon: BadmintonImage,
                imageUrl: 'http://www.revistaversatille.com.br/wp-content/uploads/Party.jpg'
            },


        ]
    }

    render() {

        const FirstRoute = () => (


            <ScrollView contentContainerStyle={styles.contentContainer}>


                <Button onPress={this._update} title="LOGOUT"/>
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