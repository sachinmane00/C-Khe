import React, { useEffect } from 'react'
import { View, Image, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from '../../constants/theme'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>

interface Props {
  navigation: Nav
}

export default function Onboarding({ navigation }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('PathSelection')
    }, 2000)
    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <Image
        source={require('../../../assets/icon.png')}
        style={styles.icon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
})
