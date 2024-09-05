import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    publicationsContainer: {
        flex: 1,
    },
    screenFullWidth: {
        width: "100%",
    },
    wrapPublication: {
        marginBottom: 20,
        marginHorizontal: 5,
        marginTop: 5
    },
    footPublication: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    btnShare: {
        margin: 0
    },
    title: {
        textAlign: "justify",
        marginTop: 5,
    },
    preview: {
        textAlign: "justify",
    }
})