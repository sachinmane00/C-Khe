import React, { useMemo } from 'react'
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native'
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
      {/* ── Brand header ── */}
      <View style={styles.brandHeader}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.brandLogo}
        />
        <View style={styles.brandText}>
          <Text style={[styles.brandName, { color: theme.colors.textPrimary }]}>C-Khe</Text>
          <Text style={[styles.brandTagline, { color: theme.colors.textSecondary }]}>
            Your CBSE Study Partner
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: theme.colors.card }]}>
            <Text style={styles.statVal}>{xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: theme.colors.card }]}>
            <StreakBadge streak={streak} size="lg" />
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: theme.colors.card }]}>
            <Text style={styles.statVal}>{badges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        <Text style={[styles.comingSoon, { color: theme.colors.textSecondary }]}>
          Full profile coming soon
        </Text>
      </View>

      <XPBar xp={xp} />
    </SafeAreaView>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: t.colors.background },
    brandHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.md,
      gap: t.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: `${t.colors.textSecondary}18`,
    },
    brandLogo: {
      width: 48,
      height: 48,
      borderRadius: 12,
    },
    brandText: {
      gap: 2,
    },
    brandName: {
      fontSize: t.fontSize.xl,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    brandTagline: {
      fontSize: t.fontSize.sm,
      fontFamily: 'DMSans_400Regular',
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
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
      alignItems: 'center',
      gap: t.spacing.xs,
    },
    statVal: {
      color: t.colors.accentPurple,
      fontSize: t.fontSize.xxl,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    statLabel: {
      color: t.colors.textSecondary,
      fontSize: t.fontSize.sm,
      fontFamily: 'DMSans_400Regular',
    },
    comingSoon: {
      textAlign: 'center',
      fontSize: t.fontSize.md,
      fontFamily: 'DMSans_400Regular',
    },
  })
}
