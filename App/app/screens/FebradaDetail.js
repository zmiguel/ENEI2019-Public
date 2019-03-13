import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
    ImageBackground
} from 'react-native';

import {Divider} from 'react-native-elements'
import AppIntroSlider from 'react-native-app-intro-slider';

import NavAbsolute from '../components/Nav';
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

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
            <View style={{height: SCREEN_HEIGHT * (1 / 3)}}>
                <View
                    style={{flexDirection: "row"}}>
                    <View style={styles.header}>
                        <View style={styles.nameText}>
                            <Text
                                style={{color: '#CC1A17', fontSize: 20}}>Febrada</Text>
                        </View>
                        <View style={styles.timeText}>
                            <Text style={{color: "#CC1A17", fontSize: 15}}>
                                <Text style={{color: "#CC1A17", fontSize: 15}}>
                                    Sexta 12 -
                                </Text>
                                14h00{/*{info.time === info.timeEnd ? info.time : `${info.time} - ${info.timeEnd}`}*/}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.descContainer}>
                    <Text style={{fontSize: 20, color: '#CC1A17'}}>Descrição</Text>
                    <Divider style={{backgroundColor: '#000'}}/>
                    <Text style={{paddingRight: 10, paddingTop: 10}}>g</Text>
                </View>

            </View>
        )
    };


    renderSlider = () => {
        const slides = [
            {
                key: 'somethun',
                title: 'Title 1',
                titleStyle: '',
                text: 'blblbalbalba',
                textStyle: '',
                backgroundColor: '#59b2ab',
            },
            {
                key: 'somethun-dos',
                title: 'Title 2',
                titleStyle: '',
                text: 'blblbalbalba',
                textStyle: '',
                backgroundColor: '#febe29',
            },
            {
                key: 'somethun1',
                title: 'Rocket guy',
                titleStyle: '',
                text: 'blblbalbalba',
                textStyle: '',
                backgroundColor: '#22bcb5',
            }
        ];
        return (
            <AppIntroSlider
                slides={slides}
                style={{height: SCREEN_WIDTH * 0.54}}
                activeDotStyle={{backgroundColor:'#CC1A17'}}
                renderDoneButton={this._buyFinosOrBifanas()}
                renderNextButton={this._renderNextButton}
            />
        )
    };

    _buyFinosOrBifanas = () => {
        //Modal
    };


    render() {

        return (

            <View style={styles.mainViewStyle}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            {this.renderHeader()}
                        </View>
                        <View style={{backgroundColor: "#fff"}}>
                            {this.renderDescription()}
                            {this.renderSlider()}
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }

}

const styles = StyleSheet.create({

    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        //color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        color:'#000',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },


    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        //height: SCREEN_HEIGHT * (1 / 3),
    },

    nameText: {
        alignSelf: 'flex-start',
        flex: 1,

    },

    timeText: {
        alignItems: 'flex-end',
        flex: 1,
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


    descContainer: {
        padding: 10,
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