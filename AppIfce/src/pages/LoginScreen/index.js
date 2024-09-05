import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput, Title, Text } from 'react-native-paper';

import { useAuth } from '../../contexts/auth';
import { useNotification } from '../../contexts/notifications';

import styles from './styles'
import { cyan } from '../../helpers/colors'

export default () => {
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, googleSignIn } = useAuth()
    const { registerForPushNotificationsAsync } = useNotification()

    useEffect(() => {
        registerForPushNotificationsAsync()
    }, [])

    function handleNavigateToRegister() {
        navigation.navigate('RegisterUser')
    }

    function handleUserSignIn() {
        signIn(username, password)
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.containerLogo}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <TextInput
                label="E-mail"
                value={username}
                onChangeText={userName => setUsername(userName)}
                type="outlined"
                style={styles.textInput}
                underlineColor={cyan}
                selectionColor={cyan}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
            />
            <TextInput
                label="Senha"
                value={password}
                onChangeText={pass => setPassword(pass)}
                type="outlined"
                style={styles.textInput}
                underlineColor={cyan}
                selectionColor={cyan}
                autoCapitalize="none"
                secureTextEntry={true}
                textContentType="password"
            />
            <Text style={styles.forgotPassword}>
                ESQUECI MINHA SENHA
            </Text>
            <Button
                mode="contained"
                style={styles.loginButton}
                onPress={handleUserSignIn}
            >Login</Button>
            <Button
                mode="contained"
                style={styles.loginButton}
                onPress={googleSignIn}
            >Entrar com o Google</Button>
            <Button
                mode="outlined"
                style={styles.registerButton}
                onPress={handleNavigateToRegister}
            >CRIAR MINHA CONTA</Button>
        </View>
    )
}