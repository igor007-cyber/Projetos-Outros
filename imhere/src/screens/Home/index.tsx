import React from "react"
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native"
import { style } from "./styles"
import { Paticipante } from "../../components/Participante"

export default function Home(){
 
    const participantes = ['bruno', 'mateus', 'katia', 'vicente', 'igor', 'ian', 'gabi', 'vitor', 'joao', 'ilton', 'leo']

    function AdicionarNovoParticipante(){
        if(participantes.includes('igor')){
            return Alert.alert('Participante existe', 'Ja existecom esse nome')
         }
        alert('voce adicionou')
    }

    function RemoverParticipante(name: string){
        Alert.alert('Remover', `Remover o participante ${name}`, [
            {
                text:'Sim',
                onPress: () => Alert.alert('Deletado')
            },
            {
                text: 'Não',
                style: 'cancelar',
            }
        ])
        alert(`voce removeu participante ${name}`)
    }
 
    return(
    <View style={style.container}>

    <Text style={style.EventName}>Nome do Evento</Text>
    <Text style={style.EventDate}>Sexta, 24 de dezembro de 2023</Text>

    <View style={style.form}>
        <TextInput 
        style={style.input}
        placeholder="Nome do Participante"
        placeholderTextColor="#6B6B6B"/>

        <TouchableOpacity style={style.botao}>
            <Text style={style.botaoText} onPress={AdicionarNovoParticipante}>
                +
            </Text>
        </TouchableOpacity>
    </View>

    <FlatList 

        data={participantes}
        keyExtractor={item => item}
        renderItem={({item })=>(
            <Paticipante 
                key={item}
                name={item}
                onRemove= {() => RemoverParticipante(item)}/> 
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
            <Text style={style.lisEmpytText}>
                niguem chegou no evento ainda
            </Text>
        )}
    />

    {/*<ScrollView showsVerticalScrollIndicator={false}>
       /
            participantes.map((participante => (
                   
            )))
        */}
     {/*</ScrollView>*/}
    </View>
  )
}