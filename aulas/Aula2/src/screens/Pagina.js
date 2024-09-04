import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Pagina = () => { // tem que ser o nome do arquivo
    const nome =  'igor'
    return(
        <View>
            <Text style={estilo.texto}>Primeira pagina mobile</Text>
            <Text style={estilo.texto2}>Meu nome é {nome}</Text>
        </View>
    )
};

const estilo = StyleSheet.create({
    texto: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    texto2: {
        fontSize:16,
        color: 'red'
    }
});

export default Pagina;  