import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../screens/Onboarding'
import TabNavigator from './TabNavigator'
import ReelFeed from '../screens/ReelFeed'
import SubjectDrillDown from '../screens/SubjectDrillDown'
import type { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
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
