import React, { useRef, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Modal,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { darkTheme, lightTheme } from '../../constants/theme'
import { useSearchStore } from '../../store/searchStore'
import SearchResultCard from './SearchResultCard'
import type { SearchResult, Subject } from '../../types'

interface Props {
  visible: boolean
  onClose: () => void
  activeSubject?: Subject | null
  onResultPress: (result: SearchResult) => void
}

export default function SearchModal({ visible, onClose, activeSubject, onResultPress }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  const {
    query,
    searchState,
    results,
    recentSearches,
    setQuery,
    runSearch,
    clearSearch,
    clearRecentSearches,
  } = useSearchStore()

  const inputRef = useRef<TextInput>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (visible) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      clearSearch()
    }
  }, [visible])

  function handleChangeText(text: string) {
    setQuery(text)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      runSearch(text, activeSubject)
    }, 400)
  }

  function handleRecentTap(q: string) {
    setQuery(q)
    runSearch(q, activeSubject)
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView
        style={[styles.screen, { backgroundColor: theme.colors.background }]}
        edges={['top', 'bottom']}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: `${theme.colors.textSecondary}20` }]}>
            <View
              style={[styles.inputRow, { backgroundColor: theme.colors.surface }]}
            >
              <Ionicons name="search" size={18} color={theme.colors.textSecondary} />
              <TextInput
                ref={inputRef}
                style={[styles.input, { color: theme.colors.textPrimary }]}
                placeholder="Search concepts, chapters..."
                placeholderTextColor={theme.colors.textSecondary}
                value={query}
                onChangeText={handleChangeText}
                returnKeyType="search"
                onSubmitEditing={() => runSearch(query, activeSubject)}
                autoCorrect={false}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => { setQuery(''); clearSearch() }}>
                  <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={[styles.cancelText, { color: theme.colors.accentPurple }]}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          {query.length === 0 ? (
            <View style={styles.recentSection}>
              <View style={styles.sectionRow}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                  Recent Searches
                </Text>
                {recentSearches.length > 0 && (
                  <TouchableOpacity onPress={clearRecentSearches}>
                    <Text style={[styles.clearText, { color: theme.colors.textSecondary }]}>
                      Clear
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {recentSearches.length === 0 ? (
                <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                  No recent searches
                </Text>
              ) : (
                recentSearches.map((q) => (
                  <TouchableOpacity
                    key={q}
                    style={styles.recentRow}
                    onPress={() => handleRecentTap(q)}
                  >
                    <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.recentText, { color: theme.colors.textPrimary }]}>{q}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          ) : (
            <FlatList
              data={results.filter((r) => r.type === 'card')}
              keyExtractor={(item, i) => item.card?.id ?? i.toString()}

              renderItem={({ item }) => (
                <SearchResultCard result={item} onPress={onResultPress} />
              )}
              contentContainerStyle={styles.list}
              ListHeaderComponent={
                searchState === 'searching' ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator size="small" color={theme.colors.accentPurple} />
                    <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
                      Searching…
                    </Text>
                  </View>
                ) : null
              }
              ListEmptyComponent={
                searchState === 'done' ? (
                  <View style={styles.emptyState}>
                    <Text style={[styles.emptyText, { color: theme.colors.textPrimary }]}>
                      No results found for "{query}"
                    </Text>
                    <Text style={[styles.emptyHint, { color: theme.colors.textSecondary }]}>
                      Try searching for a chapter name or topic
                    </Text>
                  </View>
                ) : null
              }
              keyboardShouldPersistTaps="handled"
            />
          )}

        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    padding: 0,
  },
  cancelBtn: { paddingVertical: 4 },
  cancelText: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  recentSection: {
    padding: 16,
    gap: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  clearText: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  recentText: {
    fontSize: 15,
    fontFamily: 'DMSans_400Regular',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 32,
    gap: 8,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
  },
  list: {
    padding: 12,
    gap: 8,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
  },
})
