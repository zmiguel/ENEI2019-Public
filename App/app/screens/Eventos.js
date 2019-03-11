import * as React from "react";
import {View, StyleSheet, Dimensions, Text, Button, ScrollView} from "react-native";
import {TabView, TabBar, SceneMap} from "react-native-tab-view";


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: "#ff4081"}]}/>
);
const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: "#673ab7"}]}/>
);

const ThirdRoute = () => (
    <View style={[styles.scene, {backgroundColor: "#673ab7"}]}/>
);

const FourthRoute = () => (
    <View style={[styles.scene, {backgroundColor: "#673ab7"}]}/>
);



export default class Eventos extends React.Component {
    state = {
        index: 0,
        routes: [
            {key: "first", title: "Festarola"},
            {key: "second", title: "Febrada"},
            {key: "third", title: "Rally"},
            {key: "fourth", title: "Peddy"}
        ]
    };


    renderFebrada = () => {
        return (
            <View>
                <Text>Ola mundo</Text>
            </View>
        );

    };

    renderRally = () => {

    };

    renderCaching = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView styles={styles.scroll}>
                    <View styles={styles.cardContainer}>
                        {this.renderFebrada()}
                    </View>
                    <View styles={styles.cardContainer}>

                    </View>
                    <View styles={styles.cardContainer}>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        flex: 1,
    },

    scroll: {
      flex: 1,
    },

    cardContainer: {
        flex: 1,
        padding: 10,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        height: SCREEN_WIDTH * (1/2),
    },

    scene: {
        flex: 1
    }
});
