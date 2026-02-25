import React, { useMemo } from 'react'
import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from '../../constants/theme'

interface Props {
  progress: number     // 0–100
  size?: number
  color?: string
  strokeWidth?: number
  label?: string
  emoji?: string
}

export default function ProgressRing({
  progress,
  size = 80,
  color = '#7C3AED',
  strokeWidth = 8,
  label,
  emoji,
}: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  const clampedProgress = Math.min(100, Math.max(0, progress))
  const angle = (clampedProgress / 100) * 360

  // Split the arc into right half (0°–180°) and left half (180°–360°)
  const rightRotation = Math.min(angle, 180)
  const leftRotation = Math.max(angle - 180, 0)
  const showLeft = angle > 180

  const inner = size - strokeWidth * 2

  return (
    <View style={styles.wrapper}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}

      <View style={{ width: size, height: size }}>
        {/* Track ring */}
        <View
          style={[
            styles.track,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: `${color}30`,
            },
          ]}
        />

        {/* Right half clip — shows first 180° */}
        <View
          style={[
            styles.halfClip,
            { width: size / 2, height: size, left: size / 2, overflow: 'hidden' },
          ]}
        >
          <View
            style={[
              styles.halfCircle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                borderLeftColor: 'transparent',
                borderBottomColor: 'transparent',
                transform: [{ rotate: `${rightRotation - 180}deg` }],
              },
            ]}
          />
        </View>

        {/* Left half clip — shows 180°–360° */}
        {showLeft && (
          <View
            style={[
              styles.halfClip,
              { width: size / 2, height: size, left: 0, overflow: 'hidden' },
            ]}
          >
            <View
              style={[
                styles.halfCircle,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: strokeWidth,
                  borderColor: color,
                  borderRightColor: 'transparent',
                  borderTopColor: 'transparent',
                  transform: [{ rotate: `${leftRotation - 180}deg` }],
                },
              ]}
            />
          </View>
        )}

        {/* Centre label */}
        <View
          style={[
            styles.center,
            {
              width: inner,
              height: inner,
              borderRadius: inner / 2,
              top: strokeWidth,
              left: strokeWidth,
              backgroundColor: theme.colors.card,
            },
          ]}
        >
          <Text style={[styles.pct, { color: theme.colors.textPrimary }]}>
            {clampedProgress}%
          </Text>
        </View>
      </View>

      {label ? (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 4,
  },
  emoji: {
    fontSize: 18,
    marginBottom: 2,
  },
  track: {
    position: 'absolute',
  },
  halfClip: {
    position: 'absolute',
    top: 0,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pct: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  label: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_500Medium',
    marginTop: 2,
  },
})
