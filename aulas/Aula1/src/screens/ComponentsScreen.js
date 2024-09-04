import React from "react";
import { Text, StyleSheet, View } from "react-native";

const ComponentsScreen = () => {
    const apresentacao='iai pessoal'
    return (
        <View> 
            <Text style={style.textStyle}>Esse é um componete Screen</Text>
            <Text style={style.textStyle}>{apresentacao}</Text>
            
        </View>
    )
                      //{ fontSize: 30 }, voce pode fazer assim tambem, sem precisar chamar uma constante
        
}

const style = StyleSheet.create({

    textStyle: {
        fontSize: 20
    }

});

export default ComponentsScreen;