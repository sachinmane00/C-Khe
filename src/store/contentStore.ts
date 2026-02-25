import { create } from 'zustand'
import type { Card, Subject } from '../types'
import { seedData } from '../data/seed'

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
  setCards: (cards: Card[]) => void
  cardCountFor: (subject: Subject) => number
}

export const useContentStore = create<ContentStore>()((set) => ({
  cards: seedData['Science'],
  currentIndex: 0,
  bookmarked: [],
  tooEasy: [],
  activeSubject: 'Science',

  loadCards: (subject) =>
    set({ cards: seedData[subject], currentIndex: 0, activeSubject: subject }),

  setSubject: (subject) =>
    set({ cards: seedData[subject], currentIndex: 0, activeSubject: subject }),

  setCards: (cards) =>
    set({ cards, currentIndex: 0 }),

  nextCard: () =>
    set((s) => ({
      currentIndex: Math.min(s.currentIndex + 1, s.cards.length - 1),
    })),

  bookmarkCard: (id) =>
    set((s) => ({
      bookmarked: s.bookmarked.includes(id) ? s.bookmarked : [...s.bookmarked, id],
    })),

  markTooEasy: (id) =>
    set((s) => ({ tooEasy: [...s.tooEasy, id] })),

  cardCountFor: (subject) => seedData[subject].length,
}))
