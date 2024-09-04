import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";

const Lista = () => {
    const amigos = [
        {nome: 'igor'},
        {nome: 'ian'},
        {nome: 'Pedro'},
        {nome: 'alex'},

    ];
    return(
        <FlatList 
            horizontal  
            showsHorizontalScrollIndicator={false}
            keyExtractor={amigos => amigos.nome}
            data={amigos} 
            renderItem={({ item })=>{
            return <Text style={estilo.tamanho}>{item.nome}</Text>
        }}
        />
    );

};

const estilo =  StyleSheet.create({
    tamanho: {
        fontSize: 25, 
        marginVertical:50,  
    }
});

export default Lista