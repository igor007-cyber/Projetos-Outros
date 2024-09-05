import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    formContext:{
        flex:1,
        backgroundColor:"#ffffff",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
    },

    form:{
        width:"100%",
    },

    formLabel:{
        color:"#000000",
        fontSize: 18,
        paddingLeft: 20,
    },

    input:{
        width: "90%",
        borderRadius:50,
        backgroundColor:"#f6f6f6",
        height:40,
        margin:12,
        padding:10

    },

    ButtonCalculator:{
         borderRadius:50,
         alignItems:"center",
         justifyContent:"center",
         width:"90%",
         backgroundColor:"#ff0043",
         paddingTop:14,
         paddingBottom:14,
         margin:12,
         marginTop:30,
    },

    textButtonCalculator:{
        fontSize:20,
        color:"#ffffff",  
    },

    errorMensage:{
        fontSize:12,
        color:"red",
        fontWeight:"bold",
        paddingLeft:20,
    },

    exibitionResultIMC:{
        width:"100%",
        height:"50%",
        
    },
    listImcs:{
        marginTop:20,
    },

    resultImcItem:{
        fontSize:26,
        color:"red",
        height:50,
        width:"100%",
        paddingRight:20
    },

    TextResultItem:{
        fontSize:16,
        color:"red",
    }
})

