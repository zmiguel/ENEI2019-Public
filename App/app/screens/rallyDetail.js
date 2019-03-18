/*
/*
/*
/*Esta página só está disponivel a 1 hora do rally..
*/

import * as React from "react";
import {View, StyleSheet, Dimensions, Text, Button, ScrollView, Image} from "react-native";
import {TabView, TabBar, SceneMap} from "react-native-tab-view";

import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class rallyDetail extends React.Component {

    render() {
        return (
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
                            <ScrollView horizontal>
                                <View style={styles.memberImage}>
                                    <Image
                                        source={{uri: 'https://centrik.in/wp-content/uploads/2017/02/user-image-.png'}}
                                    />
                                </View>

                            </ScrollView>
                        </View>
                    </View>

                    <ScrollView style={styles.row}>
                        <FlatList
                            data={this.props.eventsInternal}
                            renderItem={({item}) =>
                                <View>
                                    <TouchableOpacity onPress={() => navigate('eventDetail', {info: item})}>
                                        <View style={styles.cardContainer}>
                                            <Image
                                                style={{
                                                    flex: 1,
                                                    width: undefined,
                                                    height: undefined
                                                }}
                                                resizeMode="contain"
                                                source={{uri: item.imagem}}

                                            >
                                            </Image>
                                            <View style={styles.cardDesc}>
                                                <Text style={styles.cardDescText}>{item.nome}</Text>
                                                <Text style={styles.cardHours}>{item.horas}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>}
                        />

                    </ScrollView>
                </View>
            </View>
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

    memberImage: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignSelf: "center",
        marginRight: 4,
        height: 50,
        width: 50,
        backgroundColor: "transparent",

    },

});