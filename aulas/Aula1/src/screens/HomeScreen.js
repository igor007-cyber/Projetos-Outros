import React from "react";
import { Text, StyleSheet, BackHandler } from "react-native";
import { greaterThan } from "react-native-reanimated";
import { render } from "react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod";

const HomeScreen = () => {
  return <Text style={styles.text}>Minha aplicação</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
});

export default HomeScreen;
