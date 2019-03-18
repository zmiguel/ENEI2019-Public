import React, {Component} from "react";

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
    ImageBackground,
    NetInfo,
    AppState
} from "react-native";

import {Shadow} from "react-native-shadow";
import Icon from "react-native-vector-icons/Ionicons";
import {RkButton, RkTheme} from "react-native-ui-kitten";

import {connect} from "react-redux";

import {bindActionCreators} from "redux";

import * as Actions from "../store/actions"; //Import your actionss
import ImageOverlay from "react-native-image-overlay";

import {createStore} from "redux";
import PTRView from "react-native-pull-to-refresh";
import {Provider} from "react-redux";
import {ScrollView} from "react-native-gesture-handler";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import {Card, Divider} from "react-native-elements";

import RNMaterialShadows from "react-native-material-shadows";

import IconFA from "react-native-vector-icons/FontAwesome5";

class Home extends Component {
    _handleConnectionChange = isConnected => {
        // this.props.dispatch(connectionState({ status: isConnected }));
        console.log("fck that");
    };

    _refresh() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    _callApi() {
        this.props.getUserInfo(this.props.token);
    }

    constructor(props) {
        super(props);

        this.state = {
            token: {valid: false},
            logged: true,
            onHold: true,
            user: {Name: ""},
            userDetails: {},
            appState: AppState.currentState
        };
    }

    handleConnectivityChange = () => {
        console.log("asdasdasdasdasd");
    };

    componentDidMount() {
        //  NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        // this.props.hold();
        console.log("hold" + this.props.onHold);
        //this.props.logoutUser();

        //console.log(this.props.token);

        this.props.getUserInfo(this.props.userDetails.token);

        //console.log('logged:'+this.props.logged);

        //console.log(th2is.props)
    }

    componentWillUnmount() {
    }

    bClick() {
        //this.props.logoutUser();

        let a = {};
        // this.setState({ user: this.props.user });
        // console.log(this.props.user)
        //

        //var navigate  = this.props.navigation.navigate
    }

    _update = () => {
        this.props.getUserInfo(this.props.userDetails.token);
    };


    /*_removeMember = (membro.id) => {

    };*/

    render() {
        const {navigate} = this.props.navigation;

        if (this.props.onHold) {
            return (
                <View>
                    <Text>lollsss {this.props.onHold}</Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }
        if (this.props.logged) {
            return (
                <PTRView onRefresh={this._update}>
                    <ScrollView style={{backgroundColor: "#eeeeee"}}>
                        <View>
                            <ImageBackground
                                opacity={0.9}
                                source={require("../assets/img/bg_3.jpg")}
                                style={{
                                    width: "100%",

                                    //  marginTop:150,
                                    backgroundColor: "rgba(255,255,255,1)"
                                }}
                            >
                                <View style={styles.homeHeader}>
                                    <View style={styles.userImageContainer}>
                                        <Image
                                            style={styles.userImage}
                                            source={{uri: "https://i.imgur.com/XXJ7LxV.jpg"}}
                                        />
                                    </View>
                                    {this.props.user != undefined && (
                                        <Text style={styles.userText}>{this.props.user.Name}</Text>
                                    )}
                                    <Text style={styles.userTextSub}>
                                        {this.props.user.Company}
                                    </Text>
                                </View>
                            </ImageBackground>

                            <View style={styles.userStats}>
                                <View style={{backgroundColor: 'orange'}}>
                                    <Text style={styles.userStatsTitle}>Informações Importantes</Text>
                                </View>

                                <View style={styles.userStatsBox}>
                                    <Text style={{margin: 10}}>Grupo de ....</Text>
                                    <Text style={{margin: 10}}>Alojamento</Text>
                                </View>
                            </View>

                            <View>
                                <View
                                    style={{
                                        margin: 10,
                                        marginTop: 20,
                                        backgroundColor: "white",
                                        borderRadius: 3
                                    }}
                                >
                                    <View style={{backgroundColor: "#CC1A17", flex: 1, flexDirection: 'row'}}>
                                        <View style={{width: '79%'}}>
                                            <Text
                                                style={{
                                                    fontSize: 25,
                                                    color: "white",
                                                    margin: 10,
                                                    fontWeight: "bold",
                                                    marginBottom: 0
                                                }}
                                            >
                                                Os tones
                                            </Text>
                                            <Text
                                                style={{
                                                    color: "white",
                                                    marginLeft: 10,
                                                    marginBottom: 5
                                                }}
                                            >
                                                5/6 elementos
                                            </Text>
                                        </View>
                                        <View
                                            style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                            <IconFA name="plus" color={'white'} size={30}/>
                                            <Text style={{color: 'white'}}>Adicionar</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{flex: 1}}>
                                            <View style={styles.user}>
                                                <View style={styles.userLogo}>
                                                    <IconFA name="user" size={40}/>
                                                </View>
                                                <View style={styles.userT}>
                                                    <Text style={styles.userName}>Henrique Dias</Text>
                                                    <Text>AFFJASDXZ</Text>
                                                </View>

                                                <TouchableOpacity style={styles.userRemove} /*onPress={() => this._removeMember(membro.id)}*/>

                                                    <Text style={{fontWeight: 'bold'}}>rm equipa</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Divider style={{backgroundColor: "black"}}/>
                                            <View style={styles.user}>
                                                <View style={styles.userLogo}>
                                                    <IconFA name="user" size={40}/>
                                                </View>
                                                <View style={styles.userT}>
                                                    <Text style={styles.userName}>Henrique Dias</Text>
                                                    <Text>AFFJASDXZ</Text>
                                                </View>

                                                <TouchableOpacity style={styles.userRemove}>
                                                    <IconFA name="times" color={"#CC1A17"} size={30}/>
                                                    <Text>remover</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Divider style={{backgroundColor: "black"}}/>
                                            <View style={styles.user}>
                                                <View style={styles.userLogo}>
                                                    <IconFA name="user" size={40}/>
                                                </View>
                                                <View style={styles.userT}>
                                                    <Text style={styles.userName}>Henrique Dias</Text>
                                                    <Text>AFFJASDXZ</Text>
                                                </View>

                                                <TouchableOpacity style={styles.userRemove}>
                                                    <IconFA name="times" color={"#CC1A17"} size={30}/>
                                                    <Text>remover</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Divider style={{backgroundColor: "black"}}/>
                                            <View style={styles.user}>
                                                <View style={styles.userLogo}>
                                                    <IconFA name="user" size={40}/>
                                                </View>
                                                <View style={styles.userT}>
                                                    <Text style={styles.userName}>Henrique Dias</Text>
                                                    <Text>AFFJASDXZ</Text>
                                                </View>

                                                <TouchableOpacity style={styles.userRemove}>
                                                    <IconFA name="times" color={"#CC1A17"} size={30}/>
                                                    <Text>remover</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Divider style={{backgroundColor: "black"}}/>
                                            <View style={styles.user}>
                                                <View style={styles.userLogo}>
                                                    <IconFA name="user" size={40}/>
                                                </View>
                                                <View style={styles.userT}>
                                                    <Text style={styles.userName}>Henrique Dias</Text>
                                                    <Text>AFFJASDXZ</Text>
                                                </View>

                                                <TouchableOpacity style={styles.userRemove}>
                                                    <IconFA name="times" color={"#CC1A17"} size={30}/>
                                                    <Text>remover</Text>
                                                </TouchableOpacity>
                                            </View>


                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </PTRView>
            );
        } else {
            return (
                <View>
                    <Text>sem permissões para aceder aqui</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    userName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    userRemove: {
        alignContent: "center",
        alignItems: "center",

        alignSelf: 'center'
    },
    userT: {
        margin: 10,

        width: "55%",
        // backgroundColor: "red"
    },
    userLogo: {
        paddingLeft: 10,

        margin: 10
    },
    user: {
        alignSelf: "center",
        flex: 1,
        flexDirection: "row",

        margin: 10,

        marginTop: 5,
        width: "100%"
    },
    userBoxText: {
        color: "white",
        fontWeight: "bold"
    },
    userStatsBoxIcon: {
        color: "white"
    },
    userStatsBox: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: "row"
    },
    userBox: {
        alignItems: "center",
        justifyContent: "center",
        width: "33%"
    },
    userCurriculum: {
        paddingTop: 5,
        color: "red",
        fontWeight: "bold",
        fontSize: 15
    },
    userBioRow: {
        flex: 1,
        flexDirection: "row",
        padding: 10
    },
    userBioText: {},
    userBioLogo: {
        marginLeft: SCREEN_WIDTH * 0.05,
        width: SCREEN_WIDTH * 0.15
    },

    userTextSub: {
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white"
    },
    userText: {
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    homeHeader: {
        flex: 1,

        height: SCREEN_HEIGHT * 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    userImage: {
        width: 110,
        height: 110,
        borderWidth: 1,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "white"
    },
    userBio: {
        flex: 1,
        padding: 10,
        margin: 9,
        backgroundColor: "white",
        // height: SCREEN_HEIGHT*0.20,
        color: "black",
        borderRadius: 5
    },
    userStats: {
        backgroundColor: "white",
        height: SCREEN_HEIGHT * 0.2,
        //  padding: 10,
        margin: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 0
    },
    userStatsTitle: {
        margin: 10,
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        padding: 1
    },
    userImageContainer: {
        alignSelf: "center"

        // transform: [{ rotate: '-15deg'}],
    }
});

function mapStateToProps(state, props) {
    return {
        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        userDetails: state.apiReducer.userDetails,
        onHold: state.apiReducer.onHold
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
