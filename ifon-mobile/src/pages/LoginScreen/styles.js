import { StyleSheet } from 'react-native'

import { cyan } from '../../helpers/colors'

export default StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    logo: {
        marginBottom: 30,
        height: 40,
        width: 100
    },
    textInput: {
        alignSelf: "stretch",
        marginBottom: 10,
    },
    loginButton: {
        height: 50,
        justifyContent: "center",
        alignSelf: "stretch",
        backgroundColor: cyan,
        marginBottom: 10
    },
    registerButton: {
        height: 50,
        justifyContent: "center",
        alignSelf: "stretch",
        borderWidth: 1
    },
    forgotPassword: {
        marginVertical: 10,
        color: '#444',
        alignSelf: 'flex-end',
        fontSize: 12,
    }
})