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

            </View>
        )


    }
}



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