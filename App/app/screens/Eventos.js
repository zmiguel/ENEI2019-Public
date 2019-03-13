import * as React from "react";
import {View, StyleSheet, Dimensions, Text, Button, ScrollView, Image, TouchableOpacity} from "react-native";
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


    renderFebrada = (navigate) => {
        return (
            <View>
                <TouchableOpacity onPress={() => navigate('FebradaDetail')}>
                <View style={styles.cardContainer}>
                    <Image
                        style={{
                            flex: 1,
                            width: undefined,
                            height: undefined
                        }}
                        resizeMode="contain"
                        source={require('../assets/altice_logo.png')}
                    >
                    </Image>
                </View>
                </TouchableOpacity>

            </View>
        );

    };

    renderRally = () => {

        return (
            <View>
                <View style={styles.cardContainer}>
                    <Image
                        style={{
                            flex: 1,
                            width: undefined,
                            height: undefined
                        }}
                        resizeMode="contain"
                        source={require('../assets/altice_logo.png')}
                    >
                    </Image>
                </View>

            </View>
        );
    };

    renderCaching = () => {

        return (
            <View>
                <View style={styles.cardContainer}>
                    <Image
                        style={{
                            flex: 1,
                            width: undefined,
                            height: undefined
                        }}
                        resizeMode="contain"
                        source={require('../assets/altice_logo.png')}
                    >
                    </Image>
                </View>

            </View>
        );
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView styles={styles.scroll}>
                    {this.renderFebrada(navigate)}
                    {this.renderRally()}
                    {this.renderCaching()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
    },


    scroll: {
        flex: 1,
    },

    cardContainer: {
        flex: 1,
        padding: 10,
        margin: 20,
        backgroundColor: '#fff',
        height: SCREEN_WIDTH * (1 / 2),
        borderRadius: 5,
        //borderWidth: 2,
    },

    scene: {
        flex: 1
    }
});
