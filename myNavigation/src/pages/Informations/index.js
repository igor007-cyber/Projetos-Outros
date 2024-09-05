import React from "react";
import { View, Text } from "react-native";

export default function Informations({route}){
    return(
        <View style={{marginTop:60}}>
            <Text>Nome: {route.params?.nome}</Text>
            <Text>telefone: {route.params?.telefone}</Text>
            <Text>Rua: {route.params?.rua}</Text>
            <Text>Endereço: {route.params?.endereco}</Text>
            
        </View>
    )
}