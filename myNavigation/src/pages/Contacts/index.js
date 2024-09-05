import React from "react";
import { View, Text } from "react-native";
import Informations from "../Informations";

export default function Contacts({navigation}){
    return(
        <View style={{marginTop:60}}>
            <View>
                <Text>Nome: ian</Text>
                <Text>Telefone: (88)9999-9999</Text>
                <Text
                onPress={()=>navigation.navigate("Informations",{
                    nome: 'ian',
                    telefone: 854653484848,
                    rua: "napolitano",
                    endereco: 'bem ali',

                })}
                >Informations...</Text>
            </View>
            <View style={{marginTop:20}}>
                <Text>Nome: Maria</Text>
                <Text>Telefone: (88)9999-9999</Text>
                <Text
                onPress={()=>navigation.navigate("Informations")}
                >Informations...</Text>
            </View>
        </View>
    )
}