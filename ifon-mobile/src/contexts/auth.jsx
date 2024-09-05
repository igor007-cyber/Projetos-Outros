import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-google-app-auth';

import api from '../services/api'

import { useNotification } from './notifications'

const contextFormat = {
    signed: false,
    user: {},
    signIn: null,
    googleSignIn: null,
    signOut: null,
    refreshToken: null,
    loading: true
}

const AuthContext = createContext(contextFormat)

const USER_PERMANENT_STORAGE_KEY = '@IFon:user';
const AUTH_PERMANENT_STORAGE_KEY = '@IFon:authData';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const { handleRegisterTokenNotification } = useNotification()

    useEffect(() => {
        async function loadStoragedUserData() {
            const storagedUser = await AsyncStorage.getItem(USER_PERMANENT_STORAGE_KEY)
            const storagedToken = await AsyncStorage.getItem(AUTH_PERMANENT_STORAGE_KEY)

            console.log('storagedUser', storagedUser)
            console.log('storagedToken', storagedToken)

            if (storagedUser && storagedToken) {
                const { access_token } = JSON.parse(storagedToken)
                api.defaults.headers.common['authorization'] = `Bearer ${access_token}`

                setUser(JSON.parse(storagedUser))
            } else {
                setUser(null)
            }

            setLoading(false)

        }
        loadStoragedUserData()
    }, [])

    function signIn(email, password) {
        api.post(`/auth/user/login`, {
            email,
            password
        })
            .then((response) => {
                const authData = response.data
                api.defaults.headers.common['authorization'] = `Bearer ${authData.token}`
                
                const userData = {
                    name: authData.name,
                    email: authData.email
                }

                setUser(userData)
                
                AsyncStorage.setItem(USER_PERMANENT_STORAGE_KEY, JSON.stringify(userData))
                AsyncStorage.setItem(AUTH_PERMANENT_STORAGE_KEY, JSON.stringify(authData))

                console.log('Login sucessfully!', userData)

                handleRegisterTokenNotification()
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    async function signOut() {
        const authData = await AsyncStorage.getItem(AUTH_PERMANENT_STORAGE_KEY)

        api.post(`/auth/user/logout`, { refreshToken: JSON.parse(authData).refreshToken.token })
            .then(() => {
                console.log('User logged out successfully')
            })
            .catch((error) => {
                console.error('[signOut]', error.message)
            }).finally(() => {
                AsyncStorage.clear().then(() => {
                    setUser(null)
                })
            })
    }

    async function refreshToken(callback) {
        const tokenData = await AsyncStorage.getItem(AUTH_PERMANENT_STORAGE_KEY)
        const { refreshToken } = JSON.parse(tokenData)

        api.post(`/refreshToken`, {
            refreshToken
        })
            .then(response => {
                const tokenData = response.data
                api.defaults.headers.common['authorization'] = `Bearer ${tokenData.token}`
                AsyncStorage.setItem(AUTH_PERMANENT_STORAGE_KEY, JSON.stringify(tokenData))
                callback()
            })
            .catch(error => {
                console.log('Error refreshing token', error)
                setUser(null)
            })
    }

    async function googleSignIn() {
        const config = {
            iosClientId: '1071992627488-nef0cg6eur1hksb9q73aelr35pqho2il.apps.googleusercontent.com',
            androidClientId: '1071992627488-q979b5ncorofh0nkboa8kkl0prf1h0hv.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        };

        try {
            const response = await Google.logInAsync(config);

            console.log('response', response);

            const { type, user } = response;
            if (type === 'success') {
                console.log('success')
                
                // TODO Fazer a request no backend pra pegar os dados de token
                const backendResponse = await api.post('login-google', {
                    tokenId: response.idToken
                })

                console.log('backendResponse', backendResponse.data);

                const userData = {
                    name: backendResponse.data.name,
                    email: backendResponse.data.email
                }
                const authData = {
                    token: backendResponse.data.token,
                    refreshToken: backendResponse.data.refreshToken
                }

                setUser(userData);
                AsyncStorage.setItem(USER_PERMANENT_STORAGE_KEY, JSON.stringify(userData));
                AsyncStorage.setItem(AUTH_PERMANENT_STORAGE_KEY, JSON.stringify(authData));

                console.log('Login realizado com sucesso');

            } else {
                console.error('[googleSignIn]', type);
            }
            
        } catch (error) {
            console.error(`[googleSignIn]: ${error}`);
        }
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, user, signIn, googleSignIn, signOut, refreshToken, loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}