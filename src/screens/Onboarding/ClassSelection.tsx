import React, { useState, useMemo } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import { useUserStore } from '../../store/userStore'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'ClassSelection'>

interface Props {
  navigation: Nav
}

const CLASS_OPTIONS: { label: string; level: number }[] = [
  { label: '1st',  level: 1  },
  { label: '2nd',  level: 2  },
  { label: '3rd',  level: 3  },
  { label: '4th',  level: 4  },
  { label: '5th',  level: 5  },
  { label: '6th',  level: 6  },
  { label: '7th',  level: 7  },
  { label: '8th',  level: 8  },
  { label: '9th',  level: 9  },
  { label: '10th', level: 10 },
  { label: '11th', level: 11 },
  { label: '12th', level: 12 },
]

export default function ClassSelection({ navigation }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const { classLevel, setClassLevel } = useUserStore()
  const [selected, setSelected] = useState(classLevel)

  function goToHome(level: number) {
    setClassLevel(level)
    navigation.navigate('Tabs')
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={26} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.topContent}>
        <Text style={styles.stepTitle}>Which class?</Text>

        <View style={styles.chipRow}>
          {CLASS_OPTIONS.map(({ label, level }) => {
            const isSelected = level === selected
            return (
              <TouchableOpacity
                key={label}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => {
                  setSelected(level)
                  goToHome(level)
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => goToHome(selected)}>
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
    backBtn: {
      paddingHorizontal: t.spacing.md,
      paddingTop: t.spacing.sm,
      paddingBottom: t.spacing.xs,
      alignSelf: 'flex-start',
    },
    topContent: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.xl,
      gap: t.spacing.md,
    },
    stepTitle: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.xl,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: t.spacing.sm,
      marginTop: t.spacing.sm,
    },
    chip: {
      borderWidth: 2,
      borderColor: t.colors.textSecondary,
      borderRadius: t.borderRadius.full,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.sm,
    },
    chipSelected: {
      borderColor: t.colors.accentPurple,
      backgroundColor: `${t.colors.accentPurple}20`,
    },
    chipText: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.md,
      fontFamily: 'SpaceGrotesk_500Medium',
    },
    chipTextSelected: {
      color: t.colors.accentPurple,
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
