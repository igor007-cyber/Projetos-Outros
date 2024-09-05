import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { View, ActivityIndicator } from 'react-native'

import { useAuth } from '../contexts/auth'
import FreeRoutes from './freeRoutes'
import AuthorizedRoutes from './authorizedRoutes'

export default () => {
    const { signed, loading } = useAuth()
    if(loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#999" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            { signed ? (
                <AuthorizedRoutes />
            ) :
            (
                <FreeRoutes />
            )}
        </NavigationContainer>
    )
}