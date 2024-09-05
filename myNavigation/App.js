import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/drawer';//createStackNavigator,createDrawerNavigator
import Contacts from './src/pages/Contacts';
import Informations from './src/pages/Informations'
 
const Stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Contacts" component={Contacts}/>
                <Stack.Screen name="Informations" component={Informations}/>
            
            </Stack.Navigator>
        </NavigationContainer>
    )
}
