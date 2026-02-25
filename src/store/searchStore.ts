import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { SearchResult, SearchState, Subject } from '../types'
import { combineResults } from '../services/searchService'

interface SearchStore {
  query: string
  searchState: SearchState
  results: SearchResult[]
  isVisible: boolean
  recentSearches: string[]

  setQuery: (q: string) => void
  setVisible: (v: boolean) => void
  clearSearch: () => void
  runSearch: (query: string, subject?: Subject | null) => Promise<void>
  addRecentSearch: (q: string) => void
  clearRecentSearches: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      query: '',
      searchState: 'idle',
      results: [],
      isVisible: false,
      recentSearches: [],

      setQuery: (q) => set({ query: q }),

      setVisible: (v) => {
        set({ isVisible: v })
        if (!v) get().clearSearch()
      },

      clearSearch: () => set({ query: '', results: [], searchState: 'idle' }),

      runSearch: async (query, subject = null) => {
        const trimmed = query.trim()
        if (!trimmed) {
          set({ results: [], searchState: 'idle' })
          return
        }

        set({ searchState: 'searching', results: [] })

        try {
          const localResults = combineResults(trimmed)
          set({ results: localResults, searchState: 'done' })
          get().addRecentSearch(trimmed)
        } catch {
          set({ searchState: 'error' })
        }
      },

      addRecentSearch: (q) => {
        const prev = get().recentSearches
        const updated = [q, ...prev.filter((r) => r !== q)].slice(0, 8)
        set({ recentSearches: updated })
      },

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'snaplearn-search',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
)
