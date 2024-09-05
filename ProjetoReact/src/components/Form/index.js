import React, { useState } from "react";
import { TextInput, View, Text, Button, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList} from "react-native";
import ResultImc from "./ResultImc";
import style from "./style";

export default function Form(){
   
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("preencha o peso e altura")
    const [messageResult, setMessageResult] = useState(null)
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMensage,setErrorMensage] = useState(null)
    const [imcList, setImcList] = useState([])

    function ImcCalculator() {
        let heightFormat = height.replace("," , ".")//aqui ele vai substituir por ponto
        let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2);{/* o toFixed vai dizer a quantidades de casas decimais */}
        setImcList((arr) => [...arr,{id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function VerificationIMC() {
        if (imc == null) {
            Vibration.vibrate(); // vai fazer o celular vibrar
            setErrorMensage = ('Campo obrigatório*')
        }
    }

    function ResultadoImc(imc){
        if (imc <= 18.50) {
            return setMessageResult("Abaixo do peso")
        }
        else if(imc > 18.50 && imc <= 24.99){
            return setMessageResult("Peso Normal")
        }
        else if(imc > 24.99 && imc <= 29.99){
            return setMessageResult("Gordinho")
        }
        else if(imc > 29.99 && imc <= 34.99){
            return setMessageResult("Baleia")
        }
        else{
            return setMessageResult("Ja pode sacrificar")
        }
    }

    function validationImc(){
        if(weight!=null && height!=null){
            ImcCalculator()
            ResultadoImc(imc)
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual: ")
            setTextButton("Calcular novamente")
            setErrorMensage(null)
        }
        else{
            VerificationIMC()
            setImc(null)
            setMessageResult(null)
            setTextButton("calcular")
            setMessageImc("preencha o peso e a altura")
        }
        
    }

    return(
        /* ao clicar fora do campo */
       
            <View style={style.formContext}>
                {imc == null ? 
                <Pressable onPress={Keyboard.dismiss} style={style.form}>  
                    <Text style={style.formLabel}>Altura</Text>
                    <Text style={style.errorMensage}>{errorMensage}</Text>
                    <TextInput
                    style={style.input} 
                    onChangeText={setHeight} /* O onChangeText ele vai pegar o que digitou la*/
                    value={height}
                    placeholder="Ex.:1.75" 
                    keyboardType="numeric"/>
                    
                    <Text style={style.formLabel}>Peso</Text> 
                    <Text style={style.errorMensage}>{errorMensage}</Text>  
                    <TextInput
                    style={style.input} 
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex.: 75.50" 
                    keyboardType="numeric"/>

                    <TouchableOpacity
                    style={style.ButtonCalculator}
                    onPress={() => validationImc()}>
                        <Text style={style.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>  
                :
                <View style={style.exibitionResultIMC}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} MessageImcResultado={messageResult}/>  
                    <TouchableOpacity
                    style={style.ButtonCalculator}
                    onPress={() => validationImc()}>
                        <Text style={style.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>    
                }  

                <FlatList 
                showsVerticalScrollIndicator = {false} //ele nao mostra a barra de rolagem
                style={style.listImcs} 
                data={imcList.reverse()} // aqui ele vai organizar por sequencia
                renderItem={({item}) =>{
                    return(
                        <Text style={style.resultImcItem}>
                            <Text style={style.TextResultItem}> Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item) => {item.id}}
                />
            </View>/* comentario */
            
       
    );
}