import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
        marginTop: 25,
    },
    emailColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    emailIcon: {
        color: '#CC6666',
        fontSize: 30,
    },
    emailNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    emailRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 16,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
});

const Email = ({ containerStyle, onPressEmail, name, email, key}) => (
    <TouchableOpacity onPress={() => onPressEmail(email)}>
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconRow}>
                    <Icon
                        name="email"
                        underlayColor="transparent"
                        iconStyle={styles.emailIcon}
                        onPress={() => onPressEmail()}
                    />
            </View>
            <View style={styles.emailRow}>
                <View style={styles.emailColumn}>
                    <Text style={styles.emailText}>{email}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
)


export default Email