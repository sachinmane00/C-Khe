import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk'
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans'
import * as SplashScreen from 'expo-splash-screen'
import AppNavigator from './src/navigation/AppNavigator'
import { darkTheme, lightTheme } from './src/constants/theme'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
