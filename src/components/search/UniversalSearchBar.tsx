import React from 'react'
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { darkTheme, lightTheme } from '../../constants/theme'

interface Props {
  onPress: () => void
}

export default function UniversalSearchBar({ onPress }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  return (
    <TouchableOpacity
      style={[
        styles.pill,
        {
          position: 'absolute',
          bottom: 140,
          left: 16,
          right: 16,
          zIndex: 999,
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.textPrimary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="search" size={16} color={theme.colors.textSecondary} />
      <Text style={[styles.placeholder, { color: theme.colors.textSecondary }]}>
        Search concepts, chapters…
      </Text>
      <Ionicons name="sparkles" size={14} color={theme.colors.accentPurple} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  placeholder: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'DMSans_400Regular',
  },
})
