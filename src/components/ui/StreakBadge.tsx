import React, { useMemo } from 'react'
import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'

interface Props {
  streak: number
}

export default function StreakBadge({ streak }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔥 {streak}</Text>
    </View>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      borderRadius: t.borderRadius.full,
      paddingHorizontal: t.spacing.sm,
      paddingVertical: t.spacing.xs,
      borderWidth: 1,
      borderColor: t.colors.accentOrange,
    },
    text: {
      color: t.colors.accentOrange,
      fontSize: t.fontSize.sm,
      fontFamily: 'Roboto_700Bold',
    },
  })
}
