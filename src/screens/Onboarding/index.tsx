import React, { useState, useMemo } from 'react'
import {
  View, Text, TouchableOpacity,
  StyleSheet, useColorScheme, ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>

interface Props {
  navigation: Nav
}

const BOARDS = ['CBSE', 'ICSE', 'JEE', 'NEET', 'Other']
const CLASSES = ['8th', '9th', '10th', '11th', '12th']
const ACTIVE_BOARD = 'CBSE'
const ACTIVE_CLASS = '10th'

export const ONBOARDING_KEY = '@snaplearn_onboarding'

export default function Onboarding({ navigation }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const [step, setStep] = useState(1)
  const [selectedBoard, setSelectedBoard] = useState(ACTIVE_BOARD)
  const [selectedClass, setSelectedClass] = useState(ACTIVE_CLASS)

  async function handleFinish() {
    await AsyncStorage.setItem(
      ONBOARDING_KEY,
      JSON.stringify({ board: 'CBSE', class: '10' })
    )
    navigation.replace('Tabs')
  }

  // ── Step 1 ──────────────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.centerContent}>
          <Text style={styles.bigEmoji}>🎓</Text>
          <Text style={styles.title}>Study Smarter</Text>
          <Text style={styles.subtitle}>
            Swipe through concepts like reels.{'\n'}Ace your boards.
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
            <Text style={styles.primaryBtnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // ── Step 2 ──────────────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <View style={styles.topContent}>
          <Text style={styles.stepTitle}>What are you studying for?</Text>
          <View style={styles.chipGrid}>
            {BOARDS.map((board) => {
              const isActive = board === ACTIVE_BOARD
              const isSelected = board === selectedBoard
              return (
                <TouchableOpacity
                  key={board}
                  style={[
                    styles.chip,
                    isSelected && styles.chipSelected,
                    !isActive && styles.chipDisabled,
                  ]}
                  onPress={() => isActive && setSelectedBoard(board)}
                  activeOpacity={isActive ? 0.7 : 1}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {board}
                  </Text>
                  {!isActive && (
                    <Text style={styles.comingSoon}>Soon</Text>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(3)}>
            <Text style={styles.primaryBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // ── Step 3 ──────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.topContent}>
        <Text style={styles.stepTitle}>Which class?</Text>
        <View style={styles.chipGrid}>
          {CLASSES.map((cls) => {
            const isActive = cls === ACTIVE_CLASS
            const isSelected = cls === selectedClass
            return (
              <TouchableOpacity
                key={cls}
                style={[
                  styles.chip,
                  isSelected && styles.chipSelected,
                  !isActive && styles.chipDisabled,
                ]}
                onPress={() => isActive && setSelectedClass(cls)}
                activeOpacity={isActive ? 0.7 : 1}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {cls}
                </Text>
                {!isActive && <Text style={styles.comingSoon}>Soon</Text>}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleFinish}>
          <Text style={styles.primaryBtnText}>Start Learning →</Text>
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
    centerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: t.spacing.xl,
      gap: t.spacing.lg,
    },
    topContent: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.xxl,
      gap: t.spacing.xl,
    },
    bigEmoji: {
      fontSize: 80,
    },
    title: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.xxl,
      fontFamily: 'Roboto_700Bold',
      textAlign: 'center',
    },
    subtitle: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.md,
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      lineHeight: 26,
    },
    stepTitle: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.xl,
      fontFamily: 'Roboto_700Bold',
    },
    chipGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: t.spacing.sm,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: t.colors.textSecondary,
      borderRadius: t.borderRadius.full,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.sm,
      gap: t.spacing.xs,
    },
    chipSelected: {
      borderColor: t.colors.accentPurple,
      backgroundColor: `${t.colors.accentPurple}20`,
    },
    chipDisabled: {
      opacity: 0.45,
    },
    chipText: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.md,
      fontFamily: 'Roboto_500Medium',
    },
    chipTextSelected: {
      color: t.colors.accentPurple,
    },
    comingSoon: {
      color: t.colors.gold,
      fontSize: t.fontSize.xs,
      fontFamily: 'Roboto_500Medium',
      backgroundColor: `${t.colors.gold}20`,
      borderRadius: t.borderRadius.sm,
      paddingHorizontal: 4,
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
      fontFamily: 'Roboto_700Bold',
    },
  })
}
