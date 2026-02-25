import React, { useState } from 'react'
import { View, useColorScheme } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { darkTheme, lightTheme } from '../constants/theme'
import Dashboard from '../screens/Dashboard'
import Profile from '../screens/Profile'
import UniversalSearchBar from '../components/search/UniversalSearchBar'
import SearchModal from '../components/search/SearchModal'
import type { TabParamList, RootStackParamList } from './types'
import type { SearchResult } from '../types'

const Tab = createBottomTabNavigator<TabParamList>()

export default function TabNavigator() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [searchVisible, setSearchVisible] = useState(false)

  function handleResultPress(result: SearchResult) {
    setSearchVisible(false)

    if (result.type === 'chapter' && result.chapter) {
      navigation.navigate('SubjectDrillDown', { subject: result.chapter.subject })
      return
    }

    if (result.type === 'card' && result.card) {
      navigation.navigate('ReelFeed', {
        subject: result.card.subject,
        cards: [result.card],
      })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: `${theme.colors.textSecondary}20`,
          },
          tabBarActiveTintColor: theme.colors.accentPurple,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: {
            fontFamily: 'SpaceGrotesk_500Medium',
            fontSize: 11,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Search bar self-positions absolutely via insets inside the component */}
      <UniversalSearchBar onPress={() => setSearchVisible(true)} />

      {/* Search modal */}
      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        activeSubject={null}
        onResultPress={handleResultPress}
      />
    </View>
  )
}
