import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import { chaptersByClass, type CBSEChapter } from '../../data/seed/cbse_all_chapters'
import { useSearchStore } from '../../store/searchStore'
import SearchModal from '../../components/search/SearchModal'
import type { Subject, SearchResult } from '../../types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'SubjectDrillDown'>
type Route = RouteProp<RootStackParamList, 'SubjectDrillDown'>

interface Props {
  navigation: Nav
  route: Route
}

const SUBJECT_META: Record<string, { color: string; emoji: string }> = {
  Science:            { color: '#14B8A6', emoji: '🔬' },
  Math:               { color: '#7C3AED', emoji: '📐' },
  SST:                { color: '#F97316', emoji: '🌍' },
  English:            { color: '#F59E0B', emoji: '📖' },
  Hindi:              { color: '#EC4899', emoji: '✍️' },
  EVS:                { color: '#84CC16', emoji: '🌱' },
  History:            { color: '#EF4444', emoji: '🏛️' },
  Geography:          { color: '#06B6D4', emoji: '🗺️' },
  'Political Science': { color: '#8B5CF6', emoji: '⚖️' },
  Economics:          { color: '#EC4899', emoji: '💹' },
  Physics:            { color: '#3B82F6', emoji: '⚛️' },
  Chemistry:          { color: '#F97316', emoji: '🧪' },
  Biology:            { color: '#10B981', emoji: '🧬' },
}
const DEFAULT_META = { color: '#94A3B8', emoji: '📖' }

export default function SubjectDrillDown({ navigation, route }: Props) {
  const { subject, classLevel = 10 } = route.params
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  const styles = useMemo(() => createStyles(theme), [theme])

  const meta = SUBJECT_META[subject] ?? DEFAULT_META
  const chapters: CBSEChapter[] = chaptersByClass[classLevel]?.[subject] ?? []

  const [searchVisible, setSearchVisible] = useState(false)
  const { setVisible } = useSearchStore()

  function openSearch() {
    setSearchVisible(true)
    setVisible(true)
  }

  function closeSearch() {
    setSearchVisible(false)
    setVisible(false)
  }

  function handleChapterPress(chapter: CBSEChapter) {
    navigation.navigate('ReelFeed', {
      subject,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
    })
  }

  function handleResultPress(result: SearchResult) {
    closeSearch()

    if (result.type === 'card' && result.card) {
      navigation.navigate('ReelFeed', {
        subject: result.card.subject,
        cards: [result.card],
      })
    }
  }

  function renderChapter({ item }: { item: CBSEChapter }) {
    return (
      <TouchableOpacity
        style={[styles.chapterRow, { backgroundColor: theme.colors.surface }]}
        onPress={() => handleChapterPress(item)}
        activeOpacity={0.75}
      >
        <View style={[styles.chapterIcon, { backgroundColor: `${meta.color}20` }]}>
          <Ionicons name="book-outline" size={20} color={meta.color} />
        </View>
        <View style={styles.chapterText}>
          <Text style={[styles.chapterTitle, { color: theme.colors.textPrimary }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.chapterSub, { color: theme.colors.textSecondary }]}>
            {item.topics.length} topics · {item.cardCount} cards
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={[styles.screen]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.emoji}>{meta.emoji}</Text>
          <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>{subject}</Text>
          <Text style={[styles.classTag, { color: theme.colors.textSecondary }]}>
            Class {classLevel}
          </Text>
        </View>
        <TouchableOpacity onPress={openSearch} style={styles.searchBtn}>
          <Ionicons name="search" size={22} color={theme.colors.accentPurple} />
        </TouchableOpacity>
      </View>

      {/* Chapter list */}
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id}
        renderItem={renderChapter}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Chapters coming soon for {subject} Class {classLevel}.
          </Text>
        }
      />

      {/* Search modal */}
      <SearchModal
        visible={searchVisible}
        onClose={closeSearch}
        activeSubject={null}
        onResultPress={handleResultPress}
      />
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
      paddingHorizontal: t.spacing.sm,
      paddingVertical: t.spacing.sm,
    },
    backBtn: {
      padding: t.spacing.sm,
    },
    headerCenter: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    emoji: { fontSize: 22 },
    headerTitle: {
      fontSize: t.fontSize.xl,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    classTag: {
      fontSize: t.fontSize.sm,
      fontFamily: 'DMSans_400Regular',
    },
    searchBtn: {
      padding: t.spacing.sm,
    },
    list: {
      padding: t.spacing.md,
      paddingTop: t.spacing.sm,
    },
    chapterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: t.borderRadius.md,
      padding: t.spacing.md,
      gap: t.spacing.md,
    },
    chapterIcon: {
      width: 44,
      height: 44,
      borderRadius: t.borderRadius.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chapterText: {
      flex: 1,
      gap: 3,
    },
    chapterTitle: {
      fontSize: t.fontSize.md,
      fontFamily: 'SpaceGrotesk_500Medium',
    },
    chapterSub: {
      fontSize: t.fontSize.sm,
      fontFamily: 'DMSans_400Regular',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      fontSize: t.fontSize.md,
      fontFamily: 'DMSans_400Regular',
    },
  })
}
