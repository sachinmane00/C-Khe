import React, { useMemo } from 'react'
import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import { useUserStore } from '../../store/userStore'
import XPBar from '../../components/ui/XPBar'
import StreakBadge from '../../components/ui/StreakBadge'

export default function Profile() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const { xp, streak, badges } = useUserStore()

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statBox}>
            <StreakBadge streak={streak} size="lg" />
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{badges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>
        <Text style={[styles.comingSoon, { color: theme.colors.textSecondary }]}>
          Full profile coming in Sprint 3 🚀
        </Text>
      </View>
      <XPBar xp={xp} />
    </SafeAreaView>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: t.colors.background },
    header: {
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.md,
    },
    title: {
      color: t.colors.textPrimary,
      fontSize: t.fontSize.xl,
      fontFamily: 'Roboto_700Bold',
    },
    body: {
      flex: 1,
      padding: t.spacing.md,
      gap: t.spacing.xl,
    },
    statsRow: {
      flexDirection: 'row',
      gap: t.spacing.sm,
    },
    statBox: {
      flex: 1,
      backgroundColor: t.colors.card,
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
      alignItems: 'center',
      gap: t.spacing.xs,
    },
    statVal: {
      color: t.colors.accentPurple,
      fontSize: t.fontSize.xxl,
      fontFamily: 'Roboto_700Bold',
    },
    statLabel: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.sm,
      fontFamily: 'Roboto_400Regular',
    },
    comingSoon: {
      textAlign: 'center',
      fontSize: t.fontSize.md,
      fontFamily: 'Roboto_400Regular',
    },
  })
}
