/*
/*
/*
/*Esta página só está disponivel a 1 hora do rally..
*/

import * as React from "react";
import {View, StyleSheet, Dimensions, Text, Button, ScrollView} from "react-native";
import {TabView, TabBar, SceneMap} from "react-native-tab-view";

import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

export default class rallyTascas extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.headerRow}>
                    <View style={styles.leftRow}>
                        <Text styles={styles.headerText}>
                            ndjiew
                        </Text>
                    </View>
                    <View style={styles.rightRow}>
                        <Text style={styles.headerText}>
                            rfmeof
                        </Text>
                    </View>
                </View>
                <ScrollView horizontal style={}>

                </ScrollView>
                <ScrollView>

                </ScrollView>
            </View>
        )


    }
}

const styles = StyleSheet.create({

    headerRow: {
        flex: 1,
        flexDirection: "row",
    },

    headerText: {
        fontSize: 15,
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
        events: state.apiReducer.events

    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(rallyTascas);