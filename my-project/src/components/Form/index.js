import React, {useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import ResultImc from "./ResultIMC";

export default function Form(){

    const [altura, setAltura] = useState(null) 
    const [peso, setPeso] = useState(null) 
    const [mensagemIMC, setMensagemIMC] = useState('Preencha o peso e a altura') 
    const [imc, setImc] = useState(null) 
    const [textoButao, setTextoButao] = useState(null) 

    function ImcCalculator() {
        return setImc((peso/(altura*altura)).toFixed(2))
    }
    

    return(
        <View>
            <View>
                <Text>Altura</Text>
                <TextInput
                placeholder="Ex.: 1.75"
                keyboardType="numeric">
                    
                </TextInput>

                <Text>Peso</Text>
                <TextInput
                placeholder="Ex.: 50.035"
                keyboardType="numeric">

                </TextInput>

                <Button title="Calcular IMC"/>
            </View>
            <ResultImc messageResultImc={messageIMC} resultImc={imc} />
        </View>
    )
}