import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../screens/Onboarding'
import PathSelection from '../screens/Onboarding/PathSelection'
import ClassSelection from '../screens/Onboarding/ClassSelection'
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
      {/* Splash — replaces itself with PathSelection after 2s */}
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ gestureEnabled: false }}
      />

      {/* Onboarding flow — in the stack so back gestures work */}
      <Stack.Screen
        name="PathSelection"
        component={PathSelection}
        options={{ animation: 'slide_from_right', gestureEnabled: false }}
      />
      <Stack.Screen
        name="ClassSelection"
        component={ClassSelection}
        options={{ animation: 'slide_from_right' }}
      />

      {/* Main app */}
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
