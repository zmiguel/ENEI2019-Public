import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-elements'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
        marginTop: 25,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
    smsIcon: {
        color: 'gray',
        fontSize: 30,
    },
    smsRow: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    telIcon: {
        color: '#CC6666',
        fontSize: 30,
    },
    telNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    telNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    telNumberColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    telNumberText: {
        fontSize: 16,
    },
    telRow: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
    },
})

const Tel = ({
                 containerStyle,
                 name,
                 number,
                 onPressSms,
                 onPressTel,
             }) => {
    return (
        <TouchableOpacity onPress={() => onPressTel(number)}>
            <View style={[styles.container, containerStyle]}>
                <View style={styles.iconRow}>
                    <Icon
                        name="call"
                        underlayColor="transparent"
                        iconStyle={styles.telIcon}
                        onPress={() => onPressTel(number)}
                    />
                </View>
                <View style={styles.telRow}>
                    <View style={styles.telNumberColumn}>
                        <Text style={styles.telNumberText}>{number}</Text>
                    </View>

                </View>
                <View style={styles.smsRow}>
                    <Icon
                        name="textsms"
                        underlayColor="transparent"
                        iconStyle={styles.smsIcon}
                        onPress={() => onPressSms(number)}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
};


export default Tel