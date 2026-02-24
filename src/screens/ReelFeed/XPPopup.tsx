import React, { useMemo } from 'react'
import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'

interface Props {
  visible: boolean
  amount: number
}

export default function XPPopup({ visible, amount }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  if (!visible) return null

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.bubble}>
        <Text style={styles.text}>+{amount} XP</Text>
        <Text style={styles.subtext}>Got it! 🎉</Text>
      </View>
    </View>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
    },
    bubble: {
      backgroundColor: t.colors.accentPurple,
      borderRadius: t.borderRadius.lg,
      paddingHorizontal: t.spacing.xl,
      paddingVertical: t.spacing.md,
      alignItems: 'center',
      shadowColor: t.colors.accentPurple,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 8,
    },
    text: {
      color: '#F1F5F9',
      fontSize: t.fontSize.xxl,
      fontFamily: 'Roboto_700Bold',
    },
    subtext: {
      color: '#F1F5F9',
      fontSize: t.fontSize.md,
      fontFamily: 'Roboto_400Regular',
      marginTop: t.spacing.xs,
    },
  })
}
