import React, { useState, useMemo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import type { Card, QuizContent } from '../../types'
import MathText from '../ui/MathText'

interface Props {
  card: Card
  onAnswer: (correct: boolean, xpEarned: number) => void
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function QuizCard({ card, onAnswer }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const content = card.content as QuizContent
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [attempts, setAttempts] = useState(0)

  function handleOptionPress(index: number) {
    if (isAnswered) return
    if (selectedOption === content.correctIndex) return

    const isCorrect = index === content.correctIndex
    setSelectedOption(index)

    if (isCorrect) {
      onAnswer(true, attempts === 0 ? 15 : 8)
      setIsAnswered(true)
    } else {
      setAttempts((a) => a + 1)
    }
  }

  function getOptionBg(index: number): string {
    if (index === content.correctIndex && isAnswered) return theme.colors.success
    if (index === selectedOption && !isAnswered) return theme.colors.error
    return theme.colors.surface
  }

  return (
    <View style={styles.container}>
      <MathText
        text={content.question}
        textStyle={styles.question}
        mathColor={theme.colors.textPrimary}
      />

      <View style={styles.options}>
        {content.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, { backgroundColor: getOptionBg(index) }]}
            onPress={() => handleOptionPress(index)}
            disabled={isAnswered}
            activeOpacity={0.8}
          >
            <View style={styles.optionLabelBox}>
              <Text style={styles.optionLabel}>{OPTION_LABELS[index]}</Text>
            </View>
            <MathText
              text={option}
              textStyle={styles.optionText}
              mathColor={theme.colors.textPrimary}
              style={{ flex: 1 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {isAnswered && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>Explanation</Text>
          <MathText
            text={content.explanation}
            textStyle={styles.explanationText}
            mathColor={theme.colors.textSecondary}
          />
        </View>
      )}
    </View>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.card,
      borderRadius: t.borderRadius.lg,
      padding: t.spacing.lg,
      gap: t.spacing.lg,
    },
    question: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.lg,
      fontFamily: 'SpaceGrotesk_700Bold',
      lineHeight: 30,
    },
    options: {
      gap: t.spacing.sm,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
      gap: t.spacing.sm,
    },
    optionLabelBox: {
      width: 30,
      height: 30,
      borderRadius: t.borderRadius.full,
      backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionLabel: {
      color: '#F1F5F9',
      fontSize: t.fontSize.sm,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    optionText: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.md,
      fontFamily: 'DMSans_400Regular',
    },
    explanationBox: {
      backgroundColor: t.colors.surface,
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
      gap: t.spacing.xs,
    },
    explanationTitle: {
      color: t.colors.accentTeal,
      fontSize: t.fontSize.sm,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    explanationText: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.sm,
      fontFamily: 'DMSans_400Regular',
      lineHeight: 22,
    },
  })
}
