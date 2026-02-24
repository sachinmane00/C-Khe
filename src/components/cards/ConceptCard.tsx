import React, { useRef, useMemo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import type { Card, ConceptContent } from '../../types'

interface Props {
  card: Card
  onGotIt: () => void
}

export default function ConceptCard({ card, onGotIt }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const content = card.content as ConceptContent
  const lastTap = useRef<number | null>(null)

  function handlePress() {
    const now = Date.now()
    if (lastTap.current !== null && now - lastTap.current < 300) {
      onGotIt()
      lastTap.current = null
    } else {
      lastTap.current = now
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
      {/* Top: subject chip + chapter */}
      <View style={styles.topRow}>
        <View style={styles.subjectChip}>
          <Text style={styles.subjectChipText}>{card.subject}</Text>
        </View>
        <Text style={styles.chapterLabel} numberOfLines={1}>
          {card.chapter}
        </Text>
      </View>

      {/* Middle: topic + body */}
      <View style={styles.middle}>
        <Text style={styles.topic}>{content.topic}</Text>
        <Text style={styles.body}>{content.body}</Text>

        {content.analogy && (
          <View style={styles.analogyBox}>
            <Ionicons name="bulb-outline" size={18} color={theme.colors.accentTeal} />
            <Text style={styles.analogyText}>{content.analogy}</Text>
          </View>
        )}
      </View>

      <Text style={styles.hint}>Double-tap for Got it! +{card.xpValue} XP</Text>
    </TouchableOpacity>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.card,
      borderRadius: t.borderRadius.lg,
      padding: t.spacing.lg,
      justifyContent: 'space-between',
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: t.spacing.sm,
    },
    subjectChip: {
      backgroundColor: t.colors.accentPurple,
      borderRadius: t.borderRadius.full,
      paddingHorizontal: t.spacing.sm,
      paddingVertical: t.spacing.xs,
    },
    subjectChipText: {
      color: '#F1F5F9',
      fontSize: t.fontSize.xs,
      fontFamily: 'Roboto_500Medium',
    },
    chapterLabel: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.sm,
      fontFamily: 'Roboto_400Regular',
      flex: 1,
    },
    middle: {
      flex: 1,
      justifyContent: 'center',
      gap: t.spacing.md,
      paddingVertical: t.spacing.lg,
    },
    topic: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.xl,
      fontFamily: 'Roboto_700Bold',
    },
    body: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.md,
      fontFamily: 'Roboto_400Regular',
      lineHeight: 26,
    },
    analogyBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: 'rgba(20, 184, 166, 0.15)',
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
      gap: t.spacing.sm,
    },
    analogyText: {
      color: t.colors.accentTeal,
      fontSize: t.fontSize.sm,
      fontFamily: 'Roboto_400Regular',
      flex: 1,
      lineHeight: 22,
    },
    hint: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.xs,
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
    },
  })
}
