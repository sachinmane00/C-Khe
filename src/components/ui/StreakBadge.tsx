import React, { useEffect, useRef, useMemo } from 'react'
import { View, Text, Animated, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'

interface Props {
  streak: number
  size?: 'sm' | 'lg'
}

export default function StreakBadge({ streak, size = 'sm' }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const glow = useRef(new Animated.Value(0)).current

  const isGrey = streak === 0
  const isSuperStreak = streak >= 7
  const color = isGrey ? '#94A3B8' : '#F97316'

  useEffect(() => {
    if (isGrey) {
      glow.setValue(0)
      return
    }
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    )
    pulse.start()
    return () => pulse.stop()
  }, [streak, isGrey])

  const glowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [isSuperStreak ? 0.5 : 0.15, isSuperStreak ? 1 : 0.45],
  })

  const glowScale = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [1, isSuperStreak ? 1.25 : 1.12],
  })

  const isLarge = size === 'lg'

  return (
    <View style={styles.wrapper}>
      {/* Glow halo */}
      {!isGrey && (
        <Animated.View
          style={[
            styles.glow,
            {
              backgroundColor: color,
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
              width: isLarge ? 56 : 44,
              height: isLarge ? 30 : 24,
              borderRadius: 999,
            },
          ]}
        />
      )}

      {/* Badge */}
      <View
        style={[
          styles.badge,
          {
            backgroundColor: isGrey ? 'rgba(148,163,184,0.15)' : 'rgba(249,115,22,0.18)',
            borderColor: color,
            paddingHorizontal: isLarge ? 12 : 8,
            paddingVertical: isLarge ? 5 : 3,
          },
        ]}
      >
        <Text style={[styles.text, { color, fontSize: isLarge ? 16 : 14 }]}>
          🔥 {streak}
        </Text>
      </View>
    </View>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    glow: {
      position: 'absolute',
    },
    badge: {
      borderRadius: 999,
      borderWidth: 1,
    },
    text: {
      fontFamily: 'SpaceGrotesk_700Bold',
    },
  })
}
