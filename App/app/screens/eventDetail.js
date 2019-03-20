import * as React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    Text,
    Button,
    TouchableOpacity,
    ImageBackground,
    ListView,
    FlatList,
    ActivityIndicator
} from "react-native";

import moment from "moment";
import {Divider, Icon, Avatar} from "react-native-elements";
import {TabView, TabBar, SceneMap} from "react-native-tab-view";
import {RkButton, RkCard, RkText, RkTheme} from "react-native-ui-kitten";
import Timeline from "react-native-timeline-feed";

import * as Progress from "react-native-progress";

import NavAbsolute from "../components/Nav";

import {connect} from "react-redux";

import {bindActionCreators} from "redux";

import * as Actions from "../store/actions"; //Import your actionss
import Swiper from "react-native-swiper";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

import FitImage from "react-native-fit-image";

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

const formatObj = obj => {
    let a = {};

    a.push({});

    return a;
};

class eventDetail extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: (
            <NavAbsolute
                navigation={navigation}
                // title={navigation.state.params.info.name}
            />
        )
    });

    state = {};

    componentDidMount() {


        const {navigation} = this.props;
        const info = navigation.getParam("info", "error");


    }

    _update = () => {
        this.setState({user: this.props.user});

    };


    _renderRally = (info) => {
        console.log(info)
        return (
            <View>
                <View style={styles.header}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "center"
                        }}
                    >
                        <View style={styles.leftRow}>
                            <Text style={{
                                    margin: 10,
                                    marginTop: 0,
                                    marginBottom: 10,
                                    fontSize: 20,
                                    color: "#CC1A17"  }}>
                                {info.location.nome}
                            </Text>
                        </View>
                        <View style={styles.timeText}>
                            <Text style={{color: "#CC1A17", fontSize: 15}}>
                                {info.hora}
                            </Text>
                            <Text>{info.horas}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{margin: 10}}>
                            <Text
                                style={{fontSize: 15, color: "#CC1A17", fontWeight: "bold"}}
                            >
                                Descrição:
                            </Text>
                            <Divider style={{backgroundColor: "#000"}}/>
                            <View style={{marginTop: 10}}>
                                <Text>{info.location.desc}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };


    _renderEventDetail = (info) => {
        return (
            <View>
                <View style={styles.header}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "center"
                        }}
                    >
                        <View style={styles.timeText}>
                            <Text style={{color: "#CC1A17", fontSize: 15}}>
                                {info.hora}
                            </Text>
                            <Text>{info.horas}</Text>
                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                margin: 10,
                                marginTop: 0,
                                marginBottom: 10,
                                fontSize: 20,
                                color: "#CC1A17"
                            }}
                        >
                            {info.nome}
                        </Text>
                        <View style={{margin: 10}}>
                            <Text
                                style={{fontSize: 15, color: "#CC1A17", fontWeight: "bold"}}
                            >
                                Descrição:
                            </Text>
                            <Divider style={{backgroundColor: "#000"}}/>
                            <View style={{marginTop: 10}}>
                                <Text>{info.desc}</Text>
                            </View>
                            <Text
                                style={{fontSize: 15, color: "#CC1A17", fontWeight: "bold", marginTop: 10}}
                            >
                                Como posso participar?
                            </Text>
                            <Divider style={{backgroundColor: "#000"}}/>
                            <View style={{marginTop: 10}}>
                                <Text>{info.notas}</Text>
                            </View>
                            <Text
                                style={{fontSize: 15, color: "#CC1A17", fontWeight: "bold", marginTop: 10}}
                            >
                                Qual é o custo de participação?
                            </Text>
                            <Divider style={{backgroundColor: "#000"}}/>
                            <View style={{marginTop: 10}}>
                                <Text>{info.custo}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };


    _renderContainer = (info, eventType) => {
        console.log("Estou aqui " + eventType)
        if (eventType === "rally") {
            return this._renderRally(info);
        }
        else if (eventType === undefined) {
            return this._renderEventDetail(info);
        }
    };

    constructor(props) {
        super(props);

        this.data = [];
    }


    render() {
        const {navigation} = this.props;
        const info = navigation.getParam("info", "error");
        const eventType = navigation.getParam("type");

        return (
            <View style={styles.mainViewStyle}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerContainer}>
                                <View style={styles.coverContainer}>
                                    <ImageBackground
                                        source={{
                                            uri: info.imagem
                                        }}
                                        style={styles.coverImage}
                                    />
                                </View>
                            </View>
                        </View>
                        {this._renderContainer(info, eventType)}
                    </View>
                    <View style={styles.block}>
                        <Text
                            style={{fontSize: 15, color: "#CC1A17", fontWeight: "bold"}}
                        >
                            Localização
                        </Text>
                        <Divider style={{backgroundColor: "#000", marginBottom: 10}}/>
                        <Text>{info.localizacao}</Text>
                    </View>
                </ScrollView>
                <Divider style={{backgroundColor: "black"}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    block: {
        marginTop: 15,

        backgroundColor: "white",
        padding: 20,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3
    },
    AttendeeContainer: {
        flexDirection: "row",
        height: 55,
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10
    },

    centerRow: {
        alignItems: "center",
        backgroundColor: "transparent",
        flex: 3,
        flexDirection: "column",
        justifyContent: "center"
    },

    leftRow: {
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignSelf: "center"
    },
    rightRow: {
        alignItems: "flex-end",
        backgroundColor: "transparent",
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 4,
        alignSelf: "center"
    },

    icon: {
        justifyContent: "flex-start",
        marginTop: 2.8
    },

    nameAttendee: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "400",
        color: "#000",
        marginBottom: 10
    },

    details: {
        marginTop: 20,
        flex: 1,
        alignSelf: "center"
    },

    infoRow: {
        margin: 25
    },

    ramoText: {
        alignSelf: "flex-start",
        marginBottom: 5,
        color: "white",
        fontSize: 17,
        fontWeight: "400"
    },

    timeText: {
        alignItems: "flex-end",
        flex: 2,
        lineHeight: 10,
        marginRight: 20
    },

    mainViewStyle: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "column"
    },

    scroll: {
        backgroundColor: "#eee",
        flex: 1
        //marginBottom: 55,
    },

    header: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3
    },
    cardContainer: {
        flex: 1,
        padding: 10,
        //    margin: 20,
        backgroundColor: "white",
        borderRadius: 5
    },

    headerContainer: {
        flex: 1
    },

    container: {
        flex: 1,
        flexDirection: "column"
    },
    coverContainer: {
        position: "relative"
    },
    coverImage: {
        height: Dimensions.get("window").width * (2 / 4),
        width: Dimensions.get("window").width
    },
    /*headerContainer: {
          alignItems: 'center',
          backgroundColor: '#FFF',
      },*/

    carreerPathContainer: {
        backgroundColor: "#CC1A17",
        height: 50,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15
    },
    carreerPathText: {
        height: 50,
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    companyHeader: {
        backgroundColor: "#dddddd",
        // height:150,
        borderRadius: 5,
        margin: 10,
        padding: 10
    },
    companyTitle: {
        paddingBottom: 5,
        fontWeight: "bold",
        color: "#777777",
        fontSize: 17

        // padding:20
    },
    companyLogo: {
        borderRadius: 20
    },

    wrapper: {},
    company: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor:'red',
        color: "black"
    },

    companyLogoContainer: {
        flex: 1,
        justifyContent: "center",
        width: "60%",
        // backgroundColor:'white',
        margin: 20
    },
    aboutCompany: {
        width: SCREEN_WIDTH,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

function mapStateToProps(state, props) {
    return {
        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        careerPath: state.apiReducer.careerPath,
        sessionDetail: state.apiReducer.sessionDetail
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(eventDetail);
