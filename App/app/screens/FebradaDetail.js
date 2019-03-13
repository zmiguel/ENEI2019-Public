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
    ImageBackground
} from 'react-native';

import {Divider, Icon, Avatar} from 'react-native-elements'
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {
    RkButton, RkCard, RkText,
    RkTheme
} from 'react-native-ui-kitten';
import Timeline from 'react-native-timeline-feed'

import * as Progress from 'react-native-progress';

import NavAbsolute from '../components/Nav';
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class FebradaDetail extends React.Component {


    static navigationOptions = ({navigation}) => ({
        header: (
            <NavAbsolute
                navigation={navigation}
                // title={navigation.state.params.info.name}
            />
        ),
    });


    renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.coverContainer}>
                    <ImageBackground
                        source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Logo_TvAAC_2014.png',
                        }}
                        style={styles.coverImage}
                    >
                    </ImageBackground>
                </View>
            </View>
        )
    };

    renderDescription = () => {
        return (
            <View>
                <View style={styles.header}>
                    <View style={{flexDirection: "row", alignItems: 'center', alignSelf: 'center'}}>

                        <View style={styles.timeText}>
                            <Text style={{color: "#CC1A17", fontSize: 15}}>
                                {info.time === info.timeEnd ? info.time : `${info.time} - ${info.timeEnd}`}
                            </Text>
                        </View>
                    </View>
                    <View><Text
                        style={{margin: 10, marginTop: 0, fontSize: 20, color: '#CC1A17'}}>{info.name}</Text></View>

                    <View style={{margin: 10}}>

                        <Progress.Bar color={'#000000'} progress={info.Enrolled / info.MaxAttendees} height={10}
                                      unfilledColor={'white'} width={210}/>
                        <Text>{info.Enrolled} / {info.MaxAttendees}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#000'}}/>
                    <View>
                        <Text style={{fontSize: 15, color: '#CC1A17', padding: 10}}>Descrição</Text>
                        <Text style={{paddingLeft: 10, paddingRigh: 10}}></Text>
                    </View>
                </View>

                <View style={styles.block}>
                    <Text style={{fontSize: 20, color: "#CC1A17"}}>Descrição</Text>
                    <Divider style={{backgroundColor: '#000'}}/>
                    <View style={{marginTop: 10}}>
                        <Text>
                            {info.description}
                        </Text>
                    </View>
                </View>
            </View>
        )
    };

    /*

        renderMap = () => {
            return (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 2}}
                    region={{
                        latitude: 40.19092111672049,
                        latitudeDelta: 0.007664297080957283,
                        longitude: -8.410662319511175,
                        longitudeDelta: 0.007551424205303192
                    }}
                    onRegionChangeComplete={(region) => {

                        console.log(region);

                    }}

                />
            )
        };
    */


    render() {

        return (

            <View style={styles.mainViewStyle}>

                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        {this.renderHeader()}
                    </View>
                    {this.renderDescription()}
                </View>
                <View>

                </View>
            </View>

        )
    }

}

const styles = StyleSheet.create({

    block: {
        marginTop: 15,

        backgroundColor: 'white',
        padding: 20
    },
    AttendeeContainer: {
        flexDirection: 'row',
        height: 55,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
    },

    centerRow: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    leftRow: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
    },
    rightRow: {
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 4,
        alignSelf: 'center'
    },

    icon: {
        justifyContent: 'flex-start',
        marginTop: 2.8,
    },

    nameAttendee: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
        marginBottom: 10,
    },

    details: {
        marginTop: 20,
        flex: 1,
        alignSelf: 'center',
    },

    infoRow: {
        margin: 25,
    },

    ramoText: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        color: 'white',
        fontSize: 17,
        fontWeight: '400',
    },

    timeText: {
        alignItems: 'flex-end',
        flex: 2,
        lineHeight: 10,
        marginRight: 4,
    },

    mainViewStyle: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
    },

    scroll: {
        backgroundColor: '#eee',
        flex: 1,
        //marginBottom: 55,
    },

    header: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 0,

    },
    cardContainer: {
        flex: 1,
        padding: 10,
        //    margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },

    headerContainer: {
        flex: 1,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
    },
    coverContainer: {
        position: 'relative',
    },
    coverImage: {
        height: Dimensions.get('window').width * (2 / 4),
        width: Dimensions.get('window').width,
    },
    /*headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
    },*/

});


function mapStateToProps(state, props) {

    return {

        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        events: state.apiReducer.events,
        careerPath: state.apiReducer.careerPath,

    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FebradaDetail);