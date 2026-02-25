import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import type { Card, ExamTipContent } from '../../types'
import MathText from '../ui/MathText'

interface Props {
  card: Card
  onBookmark?: () => void
}

export default function ExamTipCard({ card, onBookmark }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const content = card.content as ExamTipContent

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>✍️ WRITE THIS IN YOUR PAPER</Text>
        <TouchableOpacity onPress={onBookmark} hitSlop={8}>
          <Ionicons name="bookmark-outline" size={22} color={theme.colors.gold} />
        </TouchableOpacity>
      </View>

      <View style={styles.quoteBox}>
        <MathText
          text={content.exactPhrase}
          textStyle={styles.quoteText}
          mathColor={theme.colors.textPrimary}
        />
      </View>

      <MathText
        text={content.instruction}
        textStyle={styles.instruction}
        mathColor={theme.colors.textSecondary}
      />
    </View>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.card,
      borderRadius: t.borderRadius.lg,
      borderWidth: 3,
      borderColor: t.colors.gold,
      padding: t.spacing.lg,
      gap: t.spacing.lg,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      color: t.colors.gold,
      fontSize: t.fontSize.sm,
      fontFamily: 'SpaceGrotesk_700Bold',
      flex: 1,
      marginRight: t.spacing.sm,
    },
    quoteBox: {
      backgroundColor: t.colors.surface,
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
    },
    quoteText: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.lg,
      fontFamily: 'DMSans_400Regular',
      lineHeight: 30,
    },
    instruction: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.sm,
      fontFamily: 'DMSans_400Regular',
      lineHeight: 22,
    },
  })
}
