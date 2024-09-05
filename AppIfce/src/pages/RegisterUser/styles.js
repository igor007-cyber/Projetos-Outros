import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';

import { cyan } from '../../helpers/colors'

export default StyleSheet.create({
    registerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: Constants.statusBarHeight + 20
    },
    title: {
        marginBottom: 20,
    },
    textInput: {
        marginBottom: 10,
    },
    viewCheckbox: {
        flexDirection: "row",
        alignItems: "center",
    },
    containerChips: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    chips: {
        margin: 2,
        backgroundColor: "#999",
    },
    selectedArea: {
        backgroundColor: cyan,
    },
    btnSeeMoreAreas: {
        marginTop: 10,

    },
    registerButton: {
        height: 50,
        justifyContent: "center",
        alignSelf: "stretch",
        marginVertical: 20,
    }
})

