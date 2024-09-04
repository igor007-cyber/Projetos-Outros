import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const Lista = () => {
    const amigo = [
        {nome: 'Amigo 1', idade: 12},
        {nome: 'Amigo 2', idade: 13},
        {nome: 'Amigo 3', idade: 14},
        {nome: 'Amigo 4', idade: 15},
        {nome: 'Amigo 5', idade: 16},
    ];

    return(
        <FlatList // aqui ele vai listar cada cooisa na lista
            keyExtractor={amigo => amigo.nome}
            data={amigo}
            renderItem={({ item })=>{
            return <Text style={estilo.tamanho}>{item.nome} - idade {item.idade}</Text>
        }}
        />
    );

};

const estilo = StyleSheet.create({
    tamanho:{
        fontSize:20
    }
})

export default Lista