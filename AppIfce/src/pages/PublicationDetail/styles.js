import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    detailContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    screenFullWidth: {
        width: '100%'
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    description: {
        marginTop: 10,
    },
    loadingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerAttachments: {
        marginTop: 10
    },
    fileName: {
        color: '#1166ff',
        textDecorationLine: 'underline',
        marginBottom: 2
    }
})