import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
    centerRow: {
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    container: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
        flexDirection: 'row',
        height: 55,
        justifyContent: 'center',
        left: 0,
        marginLeft: 10,
        marginRight: 10,
        //marginTop: 22,
        position: 'absolute',
        right: 0,
        zIndex: 100,
    },
    icon: {
        justifyContent: 'flex-start',
        marginTop: 2.8,
    },
    iconContainer: {
        alignSelf: 'center',
    },
    leftRow: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightRow: {
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 4,
    },
    titleText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
    },
    subTitleText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
});

class Nav extends Component {


    render() {
        const { navigation, title} = this.props;

        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.leftRow}>
                        <Icon
                            size={24}
                            name="arrow-back"
                            type="material-icon"
                            onPress={() => navigation.goBack(null)}
                            color= '#000'
                            iconStyle={styles.icon}
                            underlayColor="transparent"
                            underlineColorAndroid="transparent"
                            containerStyle={styles.iconContainer}
                            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                        />
                    </View>
                    <View style={styles.centerRow}>
                        <Text style={styles.titleText} numberOfLines={1}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.rightRow}>

                    </View>
                </View>
            </View>
        )
    }
}

export default Nav