import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import PublicationsFeed from '../pages/PublicationsFeed'
import PublicationDetail from '../pages/PublicationDetail'

const AppStack = createStackNavigator();

export default () => (
    <>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="PublicationsFeed" component={PublicationsFeed} />
            <AppStack.Screen name="PublicationDetail" component={PublicationDetail} />
        </AppStack.Navigator>
    </>
)