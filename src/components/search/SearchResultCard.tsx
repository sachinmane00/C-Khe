import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { darkTheme, lightTheme } from '../../constants/theme'
import { cardTypeConfig } from '../../constants/cardTypes'
import type { SearchResult } from '../../types'

interface Props {
  result: SearchResult
  onPress: (result: SearchResult) => void
}

export default function SearchResultCard({ result, onPress }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  if (result.type === 'chapter' && result.chapter) {
    const ch = result.chapter
    return (
      <TouchableOpacity
        style={[styles.row, { backgroundColor: theme.colors.surface }]}
        onPress={() => onPress(result)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconBox, { backgroundColor: `${theme.colors.accentPurple}20` }]}>
          <Ionicons name="layers-outline" size={20} color={theme.colors.accentPurple} />
        </View>
        <View style={styles.textCol}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]} numberOfLines={1}>
            {ch.title}
          </Text>
          <Text style={[styles.sub, { color: theme.colors.textSecondary }]}>
            {ch.subject} · {ch.cardCount} cards
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    )
  }

  if (result.type === 'card' && result.card) {
    const card = result.card
    const config = cardTypeConfig[card.type]
    const content = card.content as Record<string, unknown>
    const preview =
      (content.topic as string | undefined) ??
      (content.question as string | undefined) ??
      (content.exactPhrase as string | undefined) ??
      card.chapter

    return (
      <TouchableOpacity
        style={[styles.row, { backgroundColor: theme.colors.surface }]}
        onPress={() => onPress(result)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconBox, { backgroundColor: `${config.color}20` }]}>
          <Ionicons name={config.icon as any} size={20} color={config.color} />
        </View>
        <View style={styles.textCol}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]} numberOfLines={1}>
            {preview}
          </Text>
          <Text style={[styles.sub, { color: theme.colors.textSecondary }]}>
            {card.subject} · {config.label} · +{card.xpValue} XP
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    )
  }

  return null
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Roboto_500Medium',
  },
  sub: {
    fontSize: 13,
    fontFamily: 'Roboto_400Regular',
  },
})
