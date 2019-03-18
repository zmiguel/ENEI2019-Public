/*
/*
/*
/*Esta página só está disponivel a 1 hora do rally..
*/

import * as React from "react";
import {View,
     StyleSheet,
     Dimensions, 
     Text, 
     Button, 
     ScrollView, 
     FlatList,
      TouchableOpacity,
      Image
    } from "react-native";
import {TabView, TabBar, SceneMap} from "react-native-tab-view";

import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class teamDetail extends React.Component {

    componentDidMount(){
        this.props.getEventLocsVisited(this.props.team.id,this.props.internalToken);
    }
    render() {
        return (
            <ScrollView>
            <View>
                <View style={styles.container}>
                    <View style={{height: SCREEN_HEIGHT * 0.1, paddingBottom: 10}}>
                        <View style={styles.row}>
                            <View style={styles.leftRow}>
                                <Text style={[styles.headerText, {color: '#777'}]}>
                                    NOME
                                </Text>
                            </View>
                            <View style={styles.rightRow}>
                                <Text style={styles.headerText}>
                                    Pontos
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{height: SCREEN_HEIGHT * 0.15, paddingBottom: 10}}>
                        <View style={styles.row}>
                        
                                <View>
                                    <Text>jdasdnoa</Text>
                                </View><View>
                                <Text>asd</Text>
                            </View><View>
                                <Text>ccc</Text>
                            </View><View>
                                <Text>jdasddddddnoa</Text>
                            </View><View>
                                <Text>fddsdfe</Text>
                            </View><View>
                                <Text>ertfvvc</Text>
                            </View><View>
                                <Text>cxaqwee</Text>
                            </View><View>
                                <Text>pokmdhjene</Text>
                            </View><View>
                                <Text>mndjheke</Text>
                            </View><View>
                                <Text>qaploef</Text>
                            </View><View>
                                <Text>ploçter</Text>
                            </View><View>
                                <Text>çpolx</Text>
                            </View>

                            
                        </View>
                    </View>

                  <View style={{width:'100%', backgroundColor:'red'}}>{
                    this.props.locais &&
                  
                  <FlatList
  data={this.props.locais}
  renderItem={({item}) => <Text>{item.location.nome}</Text>}
/>}
                  </View>
                </View>
            </View>
            </ScrollView>
        )


    }
}

const styles = StyleSheet.create({

    container: {
        margin: 10,
        flex: 1,
        flexGrow: 1,
        flexDirection: "column"
    },

    row: {
        flex: 1,
        flexDirection: 'row',
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

    headerText: {
        fontSize: 25,
        color: "#CC1A17",
        fontWeight: "bold",
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

});

function mapStateToProps(state, props) {
    return {
        token: state.apiReducer.token,
        user: state.apiReducer.user,
        logged: state.apiReducer.logged,
        userDetails: state.apiReducer.userDetails,
        onHold: state.apiReducer.onHold,
        bilhete: state.apiReducer.bilhete,
        alimentacao: state.apiReducer.alimentacao,
        alojamento: state.apiReducer.alojamento,
        acesso: state.apiReducer.acesso,
        team: state.apiReducer.team,
        internalToken: state.apiReducer.internalToken,
        eventsInternal: state.apiReducer.eventsInternal,
        locais:state.apiReducer.locais
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(teamDetail);