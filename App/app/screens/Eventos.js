import * as React from "react";
import {View, StyleSheet, Dimensions, Text, Button, ScrollView, ImageBackground} from "react-native";
import {TabView, TabBar, SceneMap} from "react-native-tab-view";

import rallyImg from '../assets/rallyTascas.jpg';

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
                <View styles={styles.cardContainer}>
                    <ImageBackground
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',

                        }}
                        source={require('../assets/rallyTascas.jpg')}
                    />
                </View>

                <View styles={styles.cardContainer}>
                    <Text>Ola</Text>
                    <Text style={{color: "black"}}>Local: 1</Text>
                </View>


                <View styles={styles.cardContainer}>
                    <Text>Ola</Text>
                    <Text style={{color: "black"}}>Local: 1</Text>
                </View>

            </View>
        );

    };

    renderRally = () => {

    };

    renderCaching = () => {

    };

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.cardContainer}>
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
        flexDirection: 'row',
        padding: 10,
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        height: (SCREEN_WIDTH * (1 / 2)),
        borderWidth: 2,
        color: "#000"
    },

    scene: {
        flex: 1
    }
});
