import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from '../pages/LoginScreen'
import RegisterUser from '../pages/RegisterUser'

const AppStack = createStackNavigator();

export default () => (
    <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen name="RegisterUser" component={RegisterUser} />
    </AppStack.Navigator>
)