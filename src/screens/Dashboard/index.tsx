import React, { useMemo } from 'react'
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import { useUserStore } from '../../store/userStore'
import { useContentStore } from '../../store/contentStore'
import { allSubjects, subjectMeta, seedData } from '../../data/seed'
import StreakBadge from '../../components/ui/StreakBadge'
import ProgressRing from '../../components/ui/ProgressRing'
import XPBar from '../../components/ui/XPBar'
import type { Subject } from '../../types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Tabs'>

interface Props {
  navigation: Nav
}

export default function Dashboard({ navigation }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const { xp, streak, subjectProgress } = useUserStore()
  const { setSubject } = useContentStore()

  // Daily challenge: count cards studied today (approximate from XP)
  const dailyCards = Math.min(10, Math.floor(xp / 5) % 10)

  function goToSubjectDrillDown(subject: Subject) {
    setSubject(subject)
    navigation.navigate('SubjectDrillDown', { subject })
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.logo}
          />
          <StreakBadge streak={streak} size="sm" />
        </View>

        {/* ── Section 1: Your Subjects ── */}
        <Text style={styles.sectionTitle}>Your Subjects</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectRow}
        >
          {allSubjects.map((subject) => {
            const meta = subjectMeta[subject]
            const count = seedData[subject].length
            const progress = subjectProgress[subject] ?? 0

            return (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.subjectCard,
                  {
                    backgroundColor: `${meta.color}18`,
                    borderColor: meta.color,
                  },
                ]}
                onPress={() => goToSubjectDrillDown(subject)}
                activeOpacity={0.75}
              >
                <ProgressRing
                  progress={progress}
                  size={68}
                  color={meta.color}
                  strokeWidth={6}
                  emoji={meta.emoji}
                />
                <Text style={[styles.subjectName, { color: meta.color }]}>
                  {subject}
                </Text>
                <Text style={styles.cardCount}>
                  {count > 0 ? `${count} cards` : 'AI ready'}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* ── Section 2: Daily Challenge ── */}
        <Text style={styles.sectionTitle}>Daily Challenge</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeDate}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
            </Text>
            <Text style={styles.challengeCount}>{dailyCards}/10</Text>
          </View>
          <Text style={styles.challengeGoal}>Complete 10 cards today</Text>
          <View style={styles.challengeTrack}>
            <View
              style={[
                styles.challengeFill,
                { width: `${(dailyCards / 10) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── XP Bar pinned to bottom ── */}
      <XPBar xp={xp} />
    </SafeAreaView>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.md,
    },
    logo: {
      width: 36,
      height: 36,
      borderRadius: 8,
    },
    sectionTitle: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.lg,
      fontFamily: 'SpaceGrotesk_700Bold',
      paddingHorizontal: t.spacing.md,
      marginTop: t.spacing.md,
      marginBottom: t.spacing.sm,
    },
    subjectRow: {
      paddingHorizontal: t.spacing.md,
      gap: t.spacing.sm,
    },
    subjectCard: {
      width: 110,
      borderRadius: t.borderRadius.md,
      borderWidth: 1.5,
      padding: t.spacing.sm,
      alignItems: 'center',
      gap: t.spacing.xs,
    },
    subjectName: {
      fontSize: t.fontSize.sm,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    cardCount: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.xs,
      fontFamily: 'DMSans_400Regular',
    },
    challengeCard: {
      marginHorizontal: t.spacing.md,
      backgroundColor: t.colors.card,
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
      gap: t.spacing.sm,
    },
    challengeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    challengeDate: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.sm,
      fontFamily: 'DMSans_400Regular',
    },
    challengeCount: {
      color: t.colors.accentPurple,
      fontSize: t.fontSize.md,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    challengeGoal: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.md,
      fontFamily: 'SpaceGrotesk_500Medium',
    },
    challengeTrack: {
      height: 8,
      backgroundColor: `${t.colors.accentPurple}25`,
      borderRadius: t.borderRadius.full,
      overflow: 'hidden',
    },
    challengeFill: {
      height: '100%',
      backgroundColor: t.colors.accentPurple,
      borderRadius: t.borderRadius.full,
    },
  })
}
