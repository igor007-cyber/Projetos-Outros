import { Text, View, TextInput, TouchableOpacity } from "react-native";
import {style} from "./styles"

export default function Home(){

  function AdicionarParticipante(){
    alert('adiconar')
  }

  return(
    <View style={style.container}>
      <Text style={style.eventName}>
        Nome do Evento
        </Text>

      <Text style={style.eventDate}>Domingo, 25 de Dezembro de 2023</Text>

      <TextInput 
      style={style.input} 
      placeholder="Nome do participante" 
      placeholderTextColor="#6B6B6B"
      keyboardType="email-address"/>

      <TouchableOpacity style={style.butao} onPress={AdicionarParticipante}>

      <Text style={style.buttonTextColor}> Confirmar </Text>

      </TouchableOpacity>
    </View> 
   
   )

}