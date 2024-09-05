import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native'
import api from '../services/api'

const contextFormat = {
    expoPushToken: null,
    registerForPushNotificationsAsync: null,
    handleRegisterTokenNotification: null,
    notification: null,
    setNotification: null
}
const NotificationContext = createContext(contextFormat)

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export function NotificationProvider({ children }) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification)
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            handleInteractWithNotification(response)
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };

    }, [])

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Conceda permissão ao aplicativo para receber notificações!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        console.log(token)
        setExpoPushToken(token)
    }

    function handleRegisterTokenNotification() {
        if (expoPushToken.length > 0) {
            api.post(`app_token/store`, {
                app_token: expoPushToken
            })
                .then(() => {
                    console.log('Token for push notification successfully registered')
                })
                .catch(() => {
                    console.log('Error registering token for push notification')
                })
        }
    }

    function handleInteractWithNotification(notificationData) {
        setNotification(notificationData)
        console.log('press notification')
    }

    return (
        <NotificationContext.Provider value={{
            expoPushToken, registerForPushNotificationsAsync, handleRegisterTokenNotification, notification, setNotification
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotification() {
    const context = useContext(NotificationContext)
    return context
}