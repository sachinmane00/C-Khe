import React, { useEffect, useState } from 'react'
import { View, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { darkTheme, lightTheme } from '../constants/theme'
import Onboarding, { ONBOARDING_KEY } from '../screens/Onboarding'
import TabNavigator from './TabNavigator'
import ReelFeed from '../screens/ReelFeed'
import SubjectDrillDown from '../screens/SubjectDrillDown'
import type { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  const [initialRoute, setInitialRoute] = useState<'Onboarding' | 'Tabs' | null>(null)

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((val) => {
      setInitialRoute(val ? 'Tabs' : 'Onboarding')
    })
  }, [])

  if (initialRoute === null) return <View style={{ flex: 1, backgroundColor: theme.colors.background }} />

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="SubjectDrillDown"
        component={SubjectDrillDown}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ReelFeed"
        component={ReelFeed}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  )
}
