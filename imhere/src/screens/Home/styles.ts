import React from "react"
import { StyleSheet } from "react-native"

export const style =  StyleSheet.create({

    container:{
      flex:1,
      backgroundColor:'#131016',
      padding:24
    },
  
    EventName:{
      color:"#FDFCFE",
      fontSize:24,
      fontWeight:'bold',
      marginTop:48
    },
  
    EventDate:{
        color:"#6B6B6B",
        fontSize: 16,
    },

    input:{
        flex:1,
        height: 56,
        backgroundColor:"#1F1E25",
        borderRadius:5,
        color:"#FFF",
        padding:16,
        fontSize:16,
        marginRight:12
    },
  
    botaoText:{
        color:'#FFF',
        fontSize:40
    },

    botao:{
        width:56,
        height:56,
        backgroundColor:'#31CF67',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },

    form:{
        width:'100%',
        flexDirection:'row',
        marginTop:36,
        marginBottom:42
    },

    lisEmpytText:{
        color: '#FFF',
        fontSize:14,
        textAlign:'center'
    }

  })