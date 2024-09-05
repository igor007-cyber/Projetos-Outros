import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import Resultado from "./ResultadoCAL";

export default function Form(){
   
    const [numero1, setNumero1] = useState(null);
    const [numero2, setNumero2] = useState(null);
    const [sinal, setSinal] = useState(null);
    const [mensagem, setMensagem] = useState("Coloque os numeros");
    const [total, setTotal] = useState(null);
    const [Calcular, setCalcular] = useState("Calcular")

    function calculadora(numero1, numero2, sinal){
        if (sinal == "+") {
            total = numero1 + numero2;
            return setTotal;

        }else if (sinal == "-") {
            total = numero1 - numero2;
            return setTotal;

        }else if (sinal == "*") {
            total = numero1 * numero2;
            return setTotal;

        }else if (sinal == "/") {
            total = numero1 / numero2;
            return setTotal;
        }
    }

    function validar(){
        if (numero1 != null && numero2 != null && sinal != null) {
            calculadora(numero1, numero2, sinal);
            setNumero1(null);
            setNumero2(null);
            setMensagem('O resulta é: ')
            setCalcular("Calcular novamente")
            return
        }
        setTotal(null)
        setCalcular('Calcular')
        setMensagem('Coloque os dois numeros e o sinal')
    }
   
    return(
        <View>
            <View>
                <Text>Digite um numero:</Text>
                <TextInput
                onChangeText={setNumero1}
                value={numero1}
                placeholder="3 OU 3.5"
                keyboardType="numeric"/>

                <Text>Digite o sinal:</Text>
                <TextInput
                onChangeText={setSinal}
                value={sinal}
                placeholder=" + - * / "/>

                <Text>Digite outro numero:</Text>
                <TextInput
                onChangeText={setNumero2}
                value={numero2} 
                placeholder="3 OU 3.5"
                keyboardType="numeric"/>
                
                <Button title={Calcular}/>
            </View>
            <Resultado messagemResultado={mensagem} CalculoFinal={total} />
        </View>
    );
}