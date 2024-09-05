import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import style from "./style";

export default function ResultImc(props){

    const onShare = async () => {
        const result = await Share.share({
            message: "Meu imc hoje é: " + props.resultIMC,
        })
    }

    return(
        <View style={style.resultIMC}>
            <View style={style.boxShareButton}>
                <Text style={style.information}>{props.messageResultImc}</Text>
                <Text style={style.numberIMC}>{props.resultImc}</Text>
                <Text style={style.numberIMC}>{props.MessageImcResultado}</Text>
                <TouchableOpacity style={style.shared} onPress={onShare}>
                    <Text style={style.sharedText}>Share</Text>
                </TouchableOpacity>
            </View>            
        </View>
    );
}