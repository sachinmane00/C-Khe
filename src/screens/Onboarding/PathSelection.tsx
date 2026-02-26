import React, { useState, useMemo } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'PathSelection'>

interface Props {
  navigation: Nav
}

const BOARD_OPTIONS = [
  { emoji: '🎓', label: 'CBSE',           active: true  },
  { emoji: '📚', label: 'ICSE',           active: false },
  { emoji: '💼', label: 'Interview Prep', active: false },
  { emoji: '🏛️', label: 'UPSC',           active: false },
  { emoji: '🔬', label: 'JEE/NEET',       active: false },
  { emoji: '🌍', label: 'Other Boards',   active: false },
]

export default function PathSelection({ navigation }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const [selected, setSelected] = useState('CBSE')

  function goNext() {
    navigation.navigate('ClassSelection')
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.topContent}>
        <Text style={styles.stepTitle}>What are you studying for?</Text>
        <Text style={styles.stepSubtitle}>Pick your path</Text>

        <View style={styles.boardGrid}>
          {BOARD_OPTIONS.map((opt) => {
            const isSelected = opt.label === selected
            return (
              <TouchableOpacity
                key={opt.label}
                style={[
                  styles.boardCard,
                  isSelected && styles.boardCardSelected,
                  !opt.active && styles.boardCardDisabled,
                ]}
                onPress={() => opt.active && setSelected(opt.label)}
                activeOpacity={opt.active ? 0.75 : 1}
              >
                <Text style={styles.boardEmoji}>{opt.emoji}</Text>
                <Text style={[styles.boardLabel, isSelected && styles.boardLabelSelected]}>
                  {opt.label}
                </Text>
                {!opt.active && (
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonText}>Coming Soon</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={goNext}>
          <Text style={styles.primaryBtnText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    topContent: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.xxl,
      gap: t.spacing.md,
    },
    stepTitle: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.xl,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    stepSubtitle: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.md,
      fontFamily: 'DMSans_400Regular',
    },
    boardGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: t.spacing.sm,
      marginTop: t.spacing.sm,
    },
    boardCard: {
      width: '47%',
      borderRadius: t.borderRadius.md,
      borderWidth: 2,
      borderColor: t.colors.textSecondary,
      padding: t.spacing.md,
      alignItems: 'center',
      gap: t.spacing.xs,
      backgroundColor: t.colors.card,
    },
    boardCardSelected: {
      borderColor: t.colors.accentPurple,
      backgroundColor: `${t.colors.accentPurple}18`,
    },
    boardCardDisabled: {
      opacity: 0.5,
    },
    boardEmoji: {
      fontSize: 28,
    },
    boardLabel: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.sm,
      fontFamily: 'SpaceGrotesk_500Medium',
      textAlign: 'center',
    },
    boardLabelSelected: {
      color: t.colors.accentPurple,
    },
    comingSoonBadge: {
      backgroundColor: `${t.colors.textSecondary}25`,
      borderRadius: t.borderRadius.sm,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    comingSoonText: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.xs,
      fontFamily: 'SpaceGrotesk_500Medium',
    },
    footer: {
      padding: t.spacing.lg,
      paddingBottom: t.spacing.xl,
    },
    primaryBtn: {
      backgroundColor: t.colors.accentPurple,
      borderRadius: t.borderRadius.md,
      paddingVertical: t.spacing.md,
      alignItems: 'center',
    },
    primaryBtnText: {
      color: '#F1F5F9',
      fontSize: t.fontSize.md,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
  })
}
