import React, { useEffect } from 'react'
import { View, useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import * as SplashScreen from 'expo-splash-screen'
import ReelFeed from './src/screens/ReelFeed'
import { darkTheme, lightTheme } from './src/constants/theme'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <ReelFeed />
    </View>
  )
}
