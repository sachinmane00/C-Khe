import React, { useState, useMemo, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, Image,
  StyleSheet, useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>

interface Props {
  navigation: Nav
}

// ─── Board options ────────────────────────────────────────────────────────────
const BOARD_OPTIONS = [
  { emoji: '🎓', label: 'CBSE',           active: true  },
  { emoji: '📚', label: 'ICSE',           active: false },
  { emoji: '💼', label: 'Interview Prep', active: false },
  { emoji: '🏛️', label: 'UPSC',           active: false },
  { emoji: '🔬', label: 'JEE/NEET',       active: false },
  { emoji: '🌍', label: 'Other Boards',   active: false },
]

// ─── Class options ────────────────────────────────────────────────────────────
const CLASS_OPTIONS = ['8th', '9th', '10th', '11th', '12th']
const ACTIVE_CLASS = '10th'

// ─── Screen 1: Splash ────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    const timer = setTimeout(onDone, 2000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <View style={[splashStyles.screen, { backgroundColor: theme.colors.background }]}>
      <Image
        source={require('../../../assets/icon.png')}
        style={splashStyles.icon}
      />
    </View>
  )
}

const splashStyles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
})

// ─── Screen 2: Board picker ───────────────────────────────────────────────────
function BoardScreen({
  onNext,
}: {
  onNext: () => void
}) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const [selected, setSelected] = useState('CBSE')

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
        <TouchableOpacity style={styles.primaryBtn} onPress={onNext}>
          <Text style={styles.primaryBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// ─── Screen 3: Class picker ───────────────────────────────────────────────────
function ClassScreen({ onFinish }: { onFinish: () => void }) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const [selected, setSelected] = useState(ACTIVE_CLASS)

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.topContent}>
        <Text style={styles.stepTitle}>Which class?</Text>
        <View style={styles.chipRow}>
          {CLASS_OPTIONS.map((cls) => {
            const isActive = cls === ACTIVE_CLASS
            const isSelected = cls === selected
            return (
              <TouchableOpacity
                key={cls}
                style={[
                  styles.chip,
                  isSelected && styles.chipSelected,
                  !isActive && styles.chipDisabled,
                ]}
                onPress={() => isActive && setSelected(cls)}
                activeOpacity={isActive ? 0.7 : 1}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {cls}
                </Text>
                {!isActive && <Text style={styles.chipSoon}>Soon</Text>}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={onFinish}>
          <Text style={styles.primaryBtnText}>Start Learning →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function Onboarding({ navigation }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  function goToDashboard() {
    navigation.replace('Tabs')
  }

  if (step === 1) {
    return <SplashScreen onDone={() => setStep(2)} />
  }

  if (step === 2) {
    return <BoardScreen onNext={() => setStep(3)} />
  }

  return <ClassScreen onFinish={goToDashboard} />
}

// ─── Shared styles ────────────────────────────────────────────────────────────
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
    // ── Board grid ──
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
    // ── Class chips ──
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: t.spacing.sm,
      marginTop: t.spacing.sm,
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
      fontFamily: 'SpaceGrotesk_500Medium',
    },
    chipTextSelected: {
      color: t.colors.accentPurple,
    },
    chipSoon: {
      color: t.colors.gold,
      fontSize: t.fontSize.xs,
      fontFamily: 'SpaceGrotesk_500Medium',
      backgroundColor: `${t.colors.gold}20`,
      borderRadius: t.borderRadius.sm,
      paddingHorizontal: 4,
    },
    // ── Footer ──
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
