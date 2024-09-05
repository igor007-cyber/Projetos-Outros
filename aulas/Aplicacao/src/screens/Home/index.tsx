import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

export default function Home(){
  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome doo evento</Text>
      <Text style={styles.eventDate}>Sexta, 30 de dezembro de 2023</Text>
    </View>
  )
}