import {StyleSheet} from 'react-native';
import {RkTheme} from 'react-native-ui-kitten'
import { Dimensions} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export const UtilStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'System',
        color: RkTheme.current.colors.text.base,
    },
    section: {
        marginTop: 14,
        paddingHorizontal: 24,
        paddingVertical: 15,
    },
    bordered: {
        borderBottomColor: '#0000001A',
        borderBottomWidth: 0.5,
    },
    rowContainer: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    columnContainer: {
        marginTop: 16,
    },
    spaceAround: {
        marginHorizontal: 5,
    },
    spaceH: {
        marginHorizontal: 5,
    },
    spaceTop: {
        marginTop: 8,
    },
    spaceBottom: {
        marginBottom: 8,
    },
    spaceVertical: {
        marginVertical: 8,
    },
    description: {
        paddingRight: 10,
        paddingLeft: 20,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
    },
    exampleView: {
        paddingRight: 10,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
    },
    text: {
        color: RkTheme.current.colors.text.base,
    },
    codeText: {
        color: RkTheme.current.colors.danger,
    },
    errorMsg: {
        color: RkTheme.current.colors.danger,
        paddingLeft: 20,
        alignItems: 'center'
    },
    errorInput: {
        borderColor: RkTheme.current.colors.danger,

    },
    tab: {
        paddingLeft: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    column: {
        flexDirection: 'column',
    },
    tabContent: {
        fontSize: 32,
        alignSelf: 'center',
        padding: 30,
        color: RkTheme.current.colors.grey500,
    },


    loginImage: {
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 150, //160/2
        height: 150
    },

    //------------------//
    inputLabel: {
        paddingBottom: 15
    },
    inputContainer: {
        borderBottomColor: RkTheme.current.colors.grey500,
        marginTop: 40
    },
    input: {
        fontSize: 20,
        color: RkTheme.current.colors.primary
    }
});