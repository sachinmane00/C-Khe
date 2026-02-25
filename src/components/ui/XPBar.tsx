import React, { useEffect, useRef, useMemo } from 'react'
import { View, Text, Animated, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'

interface Props {
  xp: number
  level?: number  // optional override; calculated from xp if omitted
}

const XP_PER_LEVEL = 500

export default function XPBar({ xp }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const xpInLevel = xp % XP_PER_LEVEL
  const xpToNext = XP_PER_LEVEL - xpInLevel
  const progress = xpInLevel / XP_PER_LEVEL  // 0–1

  const barWidth = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start()
  }, [progress])

  return (
    <View style={styles.container}>
      {/* Level badge */}
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>⚡ Level {level}</Text>
      </View>

      {/* Bar */}
      <View style={styles.trackWrapper}>
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              {
                width: barWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.xpLabel}>{xpToNext} XP to next</Text>
      </View>
    </View>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: t.spacing.sm,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.sm,
      backgroundColor: t.colors.surface,
    },
    levelBadge: {
      backgroundColor: t.colors.accentPurple,
      borderRadius: t.borderRadius.full,
      paddingHorizontal: t.spacing.sm,
      paddingVertical: 4,
      minWidth: 90,
      alignItems: 'center',
    },
    levelText: {
      color: '#F1F5F9',
      fontSize: t.fontSize.sm,
      fontFamily: 'Roboto_700Bold',
    },
    trackWrapper: {
      flex: 1,
      gap: 3,
    },
    track: {
      height: 8,
      backgroundColor: `${t.colors.accentPurple}30`,
      borderRadius: t.borderRadius.full,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      backgroundColor: t.colors.accentPurple,
      borderRadius: t.borderRadius.full,
    },
    xpLabel: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.xs,
      fontFamily: 'Roboto_400Regular',
      textAlign: 'right',
    },
  })
}
