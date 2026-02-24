import { create } from 'zustand'
import type { Card, Subject } from '../types'
import scienceCards from '../data/seed/cbse10_science.json'

interface ContentStore {
  cards: Card[]
  currentIndex: number
  bookmarked: string[]
  tooEasy: string[]
  activeSubject: Subject | null
  loadCards: (subject: Subject) => void
  nextCard: () => void
  bookmarkCard: (id: string) => void
  markTooEasy: (id: string) => void
  setSubject: (subject: Subject) => void
}

export const useContentStore = create<ContentStore>()((set, get) => ({
  cards: scienceCards as Card[],
  currentIndex: 0,
  bookmarked: [],
  tooEasy: [],
  activeSubject: 'Science',

  loadCards: (subject) => {
    // Sprint 1: only Science cards available
    if (subject === 'Science') {
      set({ cards: scienceCards as Card[], currentIndex: 0, activeSubject: subject })
    }
  },

  nextCard: () =>
    set((s) => ({
      currentIndex: Math.min(s.currentIndex + 1, s.cards.length - 1),
    })),

  bookmarkCard: (id) =>
    set((s) => ({
      bookmarked: s.bookmarked.includes(id) ? s.bookmarked : [...s.bookmarked, id],
    })),

  markTooEasy: (id) =>
    set((s) => ({
      tooEasy: [...s.tooEasy, id],
    })),

  setSubject: (subject) => set({ activeSubject: subject }),
}))
