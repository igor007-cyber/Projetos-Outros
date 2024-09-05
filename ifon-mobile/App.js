import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AuthProvider } from './src/contexts/auth'
import { NotificationProvider } from './src/contexts/notifications'

import Routes from './src/routes/routes'
import { cyan } from './src/helpers/colors'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: cyan,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>

      <NotificationProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NotificationProvider>

      <StatusBar style="auto" />

    </PaperProvider>
  );
}